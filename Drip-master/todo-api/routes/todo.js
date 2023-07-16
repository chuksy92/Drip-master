/** @format */

var express = require('express');
var router = express.Router();
const { ToDo, validate } = require('../models/todo');
const { User } = require('../models/users');
const auth = require('../middleware/auth');
const _ = require('lodash');
const client = require('../redisConfig');

router.get('/', async function (req, res, next) {
	const todo = await ToDo.find().sort('-createdAt');
	res.send(todo);
});

router.post('/', auth, async function (req, res, next) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findById(req.body.userId);
	if (!user) return res.status(400).send('Invalid User');

	client.hset('tasks', taskId, JSON.stringify(updatedTask), (err, reply) => {
		if (err) {
			console.error('Error updating task:', err);
			res.status(500).json({ error: 'Error updating task' });
		} else {
			res.json({ message: 'Task updated successfully' });
		}
	});

	//   const todo = await ToDo.findById(req.body.toDoId);
	//   if (!todo) return res.status(400).send("Invalid ToDo");

	let newToDo = new ToDo({
		user: {
			_id: user._id,
			name: user.name,
			email: user.email,
		},
		title: req.body.title,
		description: req.body.description,
	});

	newToDo = await newToDo.save();

	res.send(newToDo);
});

router.put('/:id', auth, async function (req, res, next) {
	client.hget('tasks', taskId, (err, reply) => {
		if (err) {
			console.error('Error retrieving task:', err);
			res.status(500).json({ error: 'Error retrieving task' });
		} else if (reply === null) {
			res.status(404).json({ error: 'Task not found' });
		} else {
			const task = JSON.parse(reply);
			res.json(task);
		}
	});
	let todo = await ToDo.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
		description: req.body.description,
		completed: req.body.completed,
	});

	if (!todo) return res.status(404).send('ToDo not found');

	await todo.save();

	res.send(todo);
});

router.delete('/:id', auth, async function (req, res) {
	const todo = await ToDo.findByIdAndRemove(req.params.id);
	if (!todo) return res.status(404).send('To Do not found');
	res.send('ToDo Deleted');
});

module.exports = router;
