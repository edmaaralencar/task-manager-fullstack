const router = require('express').Router();

const { getAllTasks, createTask, deleteTask, getTask, updateTask } = require('../controllers/tasksController');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)

module.exports = router;
