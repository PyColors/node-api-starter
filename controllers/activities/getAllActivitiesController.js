/* eslint-disable class-methods-use-this */
import db from '../../db/db';

class AllActivitiesController {
    /**
     *
     * @param req
     * @param res
     */
    static getAllActivities(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'activities retrieved successfully',
            activities: db,
        });
    }
}

export default AllActivitiesController;
