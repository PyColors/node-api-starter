import db from '../../db/db';

class ActivityController {

    /**
     *
     * @param req
     * @param res
     */
    static getActivity(req, res) {
        const id = parseInt(req.params.id, 10);

        db.map((activity) => {
            if (activity.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'activity retrieved successfully',
                    activity,
                });
            }
        });

        return res.status(404).send({
            success: 'false',
            message: 'activity does not exist',
        });
    }
}

export default ActivityController;
