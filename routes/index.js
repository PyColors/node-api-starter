import express from 'express';
import db from '../db/db';

const router = express.Router();

// Controllers
import AllActivitiesController from '../controllers/activities/getAllActivitiesController';
import ActivityController from '../controllers/activities/getActivityController';
import CreateActivityController from '../controllers/activities/createActivityController';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route activities
router.get('/api/v1/activities', AllActivitiesController.getAllActivities);
router.get('/api/v1/activities/:id', ActivityController.getActivity);
router.post('/api/v1/activities', CreateActivityController.createActivity);

/* Delete an activity */
router.delete('/api/v1/activities/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((activity, index) => {
    if (activity.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'activity deleted successfully',
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'activity not found',
  });

});


/* Update an activity */
router.put('/api/v1/activities/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let activityFound;
  let itemIndex;
  db.map((activity, index) => {
    if (activity.id === id) {
      activityFound = activity;
      itemIndex = index;
    }
  });

  if (!activityFound) {
    return res.status(404).send({
      success: 'false',
      message: 'activity not found',
    });
  }

  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  const updatedActivity = {
    id: activityFound.id,
    title: req.body.title || activityFound.title,
    description: req.body.description || activityFound.description,
  };

  db.splice(itemIndex, 1, updatedActivity);

  return res.status(201).send({
    success: 'true',
    message: 'activity added successfully',
    updatedActivity,
  });
});

export default router;
