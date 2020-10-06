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

//app.post('/api/v1/tours', (req,res))

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