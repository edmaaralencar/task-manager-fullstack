import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../../hooks/useTask';

import { toast } from 'react-toastify';

import { api } from '../../services/api';

import styles from './styles.module.scss';

const Edit = () => {
    const { updateTask } = useTask();
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState(true);

    const [task, setTask] = useState({});
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/tasks/${id}`).then((response) => {
            setTask(response.data.task);
            setCompleted(response.data.task.completed);
            setName(response.data.task.name);
        });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await updateTask(task._id, { name, completed });
        toast.success('Tarefa atualizada com sucesso');
        navigate('/')
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>Edite sua tarefa</h1>
                <ul>
                    <li>
                        <span>ID:</span>
                        <span>{task._id}</span>
                    </li>
                    <li>
                        <span>Nome:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </li>
                    <li>
                        <span>Completar:</span>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={event => setCompleted(!completed)}
                        />
                    </li>
                    <button className={styles.buttonSubmit} type="submit">Editar</button>
                </ul>
            </form>
            <Link to="/">Volte para a página principal</Link>
        </main>
    );
};

export default Edit;
