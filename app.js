const createError = require('http-errors');
import express from 'express';

import router from './routes/index.js';

// const db = require('./db/db');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

import indexRouter from './routes/index';

import bodyParser from 'body-parser';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);

// get all activities
// app.get('/api/v1/activities', (req, res) => {
//     res.status(200).send({
//         success: 'true',
//         message: 'activities retrieved successfully',
//         activities: db
//     })
// });


// Create activity
// app.post('/api/v1/activities', (req, res) => {
//     if (!req.body.title) {
//         return res.status(400).send({
//             success: 'false',
//             message: 'title is required'
//         });
//     } else if (!req.body.description) {
//         return res.status(400).send({
//             success: 'false',
//             message: 'description is required'
//         });
//     }
//     const activity = {
//         id: db.length + 1,
//         title: req.body.title,
//         description: req.body.description
//     };
//     db.push(activity);
//     return res.status(201).send({
//         success: 'true',
//         message: 'activity added successfully',
//         activity
//     })
// });


// Get a single activity
// app.get('/api/v1/activities/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     db.map((activity) => {
//         if (activity.id === id) {
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'activity retrieved successfully',
//                 activity,
//             });
//         }
//     });
//     return res.status(404).send({
//         success: 'false',
//         message: 'activity does not exist',
//     });
// });


// Delete activity
// app.delete('/api/v1/activities/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//
//     db.map((activity, index) => {
//         if (activity.id === id) {
//             db.splice(index, 1);
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'activity deleted successfully',
//             });
//         }
//     });
//
//     return res.status(404).send({
//         success: 'false',
//         message: 'activity not found',
//     });
//
// });



// Endpoint to update activities
// app.put('/api/v1/activities/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     let activityFound;
//     let itemIndex;
//     db.map((activity, index) => {
//         if (activity.id === id) {
//             activityFound = activity;
//             itemIndex = index;
//         }
//     });
//
//     if (!activityFound) {
//         return res.status(404).send({
//             success: 'false',
//             message: 'activity not found',
//         });
//     }
//
//     if (!req.body.title) {
//         return res.status(400).send({
//             success: 'false',
//             message: 'title is required',
//         });
//     } else if (!req.body.description) {
//         return res.status(400).send({
//             success: 'false',
//             message: 'description is required',
//         });
//     }
//
//     const updatedActivity = {
//         id: activityFound.id,
//         title: req.body.title || activityFound.title,
//         description: req.body.description || activityFound.description,
//     };
//
//     db.splice(itemIndex, 1, updatedActivity);
//
//     return res.status(201).send({
//         success: 'true',
//         message: 'activity added successfully',
//         updatedActivity,
//     });
// });




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
