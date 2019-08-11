import db from '../../db/db';

class UpdateActivityController {

    /**
     *
     * @param req
     * @param res
     */
    static updateActivity(req, res) {
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

        const newActivity = {
            id: activityFound.id,
            title: req.body.title || activityFound.title,
            description: req.body.description || activityFound.description,
        };

        db.splice(itemIndex, 1, newActivity);

        return res.status(201).send({
            success: 'true',
            message: 'activity added successfully',
            newActivity,
        });
    }
}

export default UpdateActivityController;
