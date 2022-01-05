import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import plusIcon from '../../assets/plus-square.svg';

import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';

import { toast } from 'react-toastify';

import { useTask } from '../../hooks/useTask';
import { useState } from 'react';

const Home = () => {
    const { createTask, tasks, deleteTask } = useTask();
    const [name, setName] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name) {
            await createTask({ name, completed: false });
            toast.success('Tarefa criada com sucesso');
            setName('')
            return;
        }

        toast.error('Preencha o campo');
    };

    const handleDelete = async (taskId) => {
        deleteTask(taskId);
        toast.success('Tarefa deletada com sucesso');
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>Gerenciador de tarefas</h1>
                <div>
                    <input
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        placeholder="Adicione uma tarefa"
                    />
                    <button type="submit">
                        <img src={plusIcon} alt="Add Task" />
                    </button>
                </div>
            </form>
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.completed ? (
                            <span className={styles.completed}>{task.name}</span>
                        ) : (
                            <span>{task.name}</span>
                        )}
                        <div className={styles.actions}>
                            <Link to={`/edit/${task._id}`}>
                                <img src={editIcon} alt="Edit task" />
                            </Link>
                            <img
                                onClick={() => handleDelete(task._id)}
                                src={deleteIcon}
                                alt="Delete task"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Home;
