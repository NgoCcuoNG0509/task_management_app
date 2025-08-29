import React, { useState, useEffect } from 'react';

export default function TaskModal({ task, onClose, onSave }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    if(task){
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'todo');
    } else {
      setTitle(''); setDescription(''); setStatus('todo');
    }
  }, [task]);

  function handleSubmit(e){
    e.preventDefault();
    if(!title.trim()) return alert('Nhập tiêu đề');
    const payload = { id: task?.id, title: title.trim(), description: description.trim(), status };
    onSave(payload);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title
            <input value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
          <label>Description
            <textarea value={description} onChange={e=>setDescription(e.target.value)} />
          </label>
          <label>Status
            <select value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn">Save</button>
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
