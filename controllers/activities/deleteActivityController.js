import db from '../../db/db';

class DeleteActivityController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static deleteActivity(req, res) {
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
        db.splice(itemIndex, 1);

        return res.status(200).send({
            success: 'true',
            message: 'Activity deleted successfuly',
        });
    }
}

export default DeleteActivityController;
