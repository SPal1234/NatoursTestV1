const fs = require('fs');
const express = require('express');
const { Server } = require('http');
const { Router } = require('express');

const app = express();
app.use(express.json());

app.use((req,res, next) => {
console.log('Hello from middleware !');
next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req,res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status : 'success',
        requestedat : req.requestTime,
        result: tours.length,
        data:{
            tours
        }
    });
};

const getTourById = (req,res) => {

    console.log(req.params);
    const id = req.params.id*1;

    if(id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    const tour = tours.find(el=>el.id === id);
    res.status(200).json({
        status : 'success',
        //result: tours.length,
        data:{
            tour
        }
    });
};

const createTour = (req,res) =>{
    //console.log(req.body);
    const newID = tours[tours.length -1].id+1;
    const newTour = Object.assign( {id:newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),_err =>{
        res.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
        });
    });
};

const updateTour = (req, res) => {

var file_cont = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
var content = JSON.parse(file_cont);
var fid = content.id;



    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>'
      }
    });
};

const deleteTour = (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null
    });
  };

app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app.route('/api/v1/tours/:id')
.get(getTourById)
.patch(updateTour)
.delete(deleteTour);

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

app.get('/api/v1/users', (_req,res) => {
    res.status(200).json({
        status : 'success',
        result: users.length,
        data:{
            users
        }
    });
});

//const reviews = JSON.parse(
//    fs.readFileSync(`${__dirname}/dev-data/data/reviews.json`)
//);

//app.get('/api/v1/reviews', (req,res) => {
//    res.status(200).json({
//        status : 'success',
//        result: reviews.length,
//        data:{
//            reviews
//        }
//    });
//});

const port = 3000;


app.listen(port, () => {
    console.log('App running on port '+ port+ '..')
});
