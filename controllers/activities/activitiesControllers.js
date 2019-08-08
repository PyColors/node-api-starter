/* eslint-disable class-methods-use-this */
import db from '../../db/db';

class ActivitiesController {

    createActivity(req, res) {
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
        const todo = {
            id: db.length + 1,
            title: req.body.title,
            description: req.body.description,
        };
        db.push(todo);
        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            todo,
        });
    }

    updateActivity(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        db.map((todo, index) => {
            if (todo.id === id) {
                todoFound = todo;
                itemIndex = index;
            }
        });

        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'todo not found',
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
            id: todoFound.id,
            title: req.body.title || todoFound.title,
            description: req.body.description || todoFound.description,
        };

        db.splice(itemIndex, 1, newActivity);

        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            newActivity,
        });
    }

    deleteActivity(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        db.map((todo, index) => {
            if (todo.id === id) {
                todoFound = todo;
                itemIndex = index;
            }
        });

        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'todo not found',
            });
        }
        db.splice(itemIndex, 1);

        return res.status(200).send({
            success: 'true',
            message: 'Activity deleted successfuly',
        });
    }
}

const activityController = new ActivitiesController();
export default activityController;
