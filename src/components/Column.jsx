import React from 'react';
import TaskCard from './TaskCard';

export default function Column({ status, title, tasks, onEdit, onDelete, onMove }){
  function handleDrop(e){
    e.preventDefault();
    try {
      const payload = JSON.parse(e.dataTransfer.getData('text/plain'));
      if(payload && payload.id){
        onMove(payload.id, status);
      }
    } catch(err) { /* ignore */ }
    e.dataTransfer.clearData();
  }
  function handleDragOver(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  return (
    <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="column-header">
        <h3>{title}</h3>
        <span className="count">{tasks.length}</span>
      </div>
      <div className="column-body">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={() => onEdit(task)} onDelete={() => onDelete(task.id)} onMove={onMove} />
        ))}
      </div>
    </div>
  );
}
