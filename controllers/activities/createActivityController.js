import db from '../../db/db';

class CreateActivityController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static createActivity(req, res) {
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
        const activity = {
            id: db.length + 1,
            title: req.body.title,
            description: req.body.description,
        };
        db.push(activity);
        return res.status(201).send({
            success: 'true',
            message: 'activity added successfully',
            activity,
        });
    }
}

export default CreateActivityController;
