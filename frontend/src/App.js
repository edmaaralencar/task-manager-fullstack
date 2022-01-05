import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';

import './styles/global.scss';

import { TaskProvider } from './hooks/useTask';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <TaskProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Routes>
            </Router>
            <ToastContainer /> 
        </TaskProvider>
    );
};

export default App;
