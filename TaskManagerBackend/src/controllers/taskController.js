const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ userId: req.user.userId, title, description });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching tasks' });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting task' });
    }
};
