import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/tasks').then((response) => setTasks(response.data.tasks));
    }, []);

    const createTask = async (task) => {
        const response = await api.post('/tasks', { ...task });

        console.log(response.data.task);
        setTasks([...tasks, response.data.task]);
    };

    const deleteTask = async (taskId) => {
        await api.delete(`/tasks/${taskId}`);

        setTasks(tasks.filter((task) => task._id !== taskId));
    };

    const updateTask = async (taskId, updatedTask) => {
        await api.patch(`/tasks/${taskId}`, updatedTask);

        setTasks(
            tasks.map((task) =>
                task._id === taskId ? { ...task, ...updatedTask } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;

export const useTask = () => {
    return useContext(TaskContext);
};
