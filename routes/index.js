import express from 'express';
import db from '../db/db';

const router = express.Router();

// Controllers
import AllActivitiesController from '../controllers/activities/getAllActivitiesController';
import ActivityController from '../controllers/activities/getActivityController';
import CreateActivityController from '../controllers/activities/createActivityController';
import UpdateActivityController from '../controllers/activities/UpdateActivityController';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route activities
router.get('/api/v1/activities', AllActivitiesController.getAllActivities);
router.get('/api/v1/activities/:id', ActivityController.getActivity);
router.post('/api/v1/activities', CreateActivityController.createActivity);
router.put('/api/v1/activities/:id', UpdateActivityController.updateActivity);

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

export default router;
