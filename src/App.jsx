import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import { loadTasks, saveTasks } from './services/storage';
// import firebase helpers if you enable Firebase

const SAMPLE = [
  { id: 't_' + Date.now(), title: 'Demo task', description: 'Mô tả', status: 'todo', createdAt: Date.now() }
];

export default function App(){
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  // toggle to use firebase if you implement firebaseService
  const USE_FIREBASE = false;

  useEffect(() => {
    if(USE_FIREBASE){
      // integrate firebase subscription here (optional)
      // subscribeTasks(setTasks) ...
    } else {
      const t = loadTasks();
      setTasks(t.length ? t : SAMPLE);
    }
  }, []);

  useEffect(() => {
    if(!USE_FIREBASE) saveTasks(tasks);
  }, [tasks]);

  // CRUD
  function addTask(payload){
    const newTask = {
      id: 't_' + Date.now() + Math.floor(Math.random()*1000),
      ...payload,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
    // if firebase: addTaskFirestore(newTask)
  }

  function updateTask(updated){
    setTasks(prev => prev.map(t => t.id === updated.id ? { ...t, ...updated, updatedAt: Date.now() } : t));
    // if firebase: updateTaskFirestore(updated.id, updated)
  }

  function deleteTask(id){
    setTasks(prev => prev.filter(t => t.id !== id));
    // if firebase: deleteTaskFirestore(id)
  }

  // Move task to status; placing it at the top of that column
  function moveTask(taskId, toStatus){
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      if(!task) return prev;
      const rest = prev.filter(t => t.id !== taskId);
      const updated = { ...task, status: toStatus, updatedAt: Date.now() };
      // group order: todo, inprogress, done
      const statuses = ['todo','inprogress','done'];
      const grouped = statuses.flatMap(status => {
        if(status === toStatus) return [updated, ...rest.filter(r => r.status === status)];
        return rest.filter(r => r.status === status);
      });
      // include any tasks with unknown status at end
      const others = rest.filter(r => !statuses.includes(r.status));
      return [...grouped, ...others];
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <div>
          <button className="btn" onClick={() => { setEditingTask(null); setModalOpen(true); }}>
            + New Task
          </button>
        </div>
      </header>

      <main>
        <Board
          tasks={tasks}
          onEdit={(task) => { setEditingTask(task); setModalOpen(true); }}
          onDelete={deleteTask}
          onMove={moveTask}
          onUpdate={updateTask}
        />
      </main>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setModalOpen(false)}
          onSave={(data) => {
            if(data.id) updateTask(data); else addTask(data);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
