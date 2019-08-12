

import { Router } from 'express';
const router = Router();

// Activities Controllers
import AllActivitiesController from '../controllers/activities/getAllActivitiesController';
import ActivityController from '../controllers/activities/getActivityController';
import CreateActivityController from '../controllers/activities/createActivityController';
import UpdateActivityController from '../controllers/activities/UpdateActivityController';
import DeleteActivityController from '../controllers/activities/deleteActivityController';

// Routes activities
router.get('/api/v1/activities', AllActivitiesController.getAllActivities);
router.get('/api/v1/activities/:id', ActivityController.getActivity);
router.post('/api/v1/activities', CreateActivityController.createActivity);
router.put('/api/v1/activities/:id', UpdateActivityController.updateActivity);
router.delete('/api/v1/activities/:id', DeleteActivityController.deleteActivity);

export default router;
