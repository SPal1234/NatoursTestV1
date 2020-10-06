const fs = require('fs');
const express = require('express');
const { Server } = require('http');

const app = express();
app.use(express.json());

//app.get('/', (req,res) =>{
//    res
//    .status(200)
//    .json({message : 'Hello from the server!', app :'natours'} );
//});

//app.post('/', (req,res) =>{
//    res.send('You can post to this endpoint');
//});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req,res) => {
    res.status(200).json({
        status : 'success',
        result: tours.length,
        data:{
            tours
        }
    });
});

app.get('/api/v1/tours/:id', (req,res) => {

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
});

app.post('/api/v1/tours', (req,res) =>{
    //console.log(req.body);
    const newID = tours[tours.length -1].id+1;
    const newTour = Object.assign( {id:newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err =>{
        res.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
        });
    }
    );

    //res.send('Done');
});

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

app.get('/api/v1/users', (req,res) => {
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
    console.log('App running on port '+ port+ '..');
});