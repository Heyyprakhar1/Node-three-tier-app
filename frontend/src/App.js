import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch tasks from backend
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Add new task
    const addTask = async () => {
        if (!taskInput.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: taskInput })
            });

            if (response.ok) {
                setTaskInput('');
                fetchTasks();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
        setLoading(false);
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE'
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>📝 Task Manager</h1>

                <div className="input-section">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        placeholder="Enter a new task..."
                    />
                    <button onClick={addTask} disabled={loading}>
                        {loading ? 'Adding...' : 'Add Task'}
                    </button>
                </div>

                <div className="task-list">
                    {tasks.length === 0 ? (
                        <p className="no-tasks">No tasks yet. Add one above!</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="task-item">
                                <span>{task.title}</span>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
