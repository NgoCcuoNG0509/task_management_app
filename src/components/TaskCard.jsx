import React from 'react';

export default function TaskCard({ task, onEdit, onDelete, onMove }){
  function onDragStart(e){
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: task.id }));
    e.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
      title={task.description || ''}
    >
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-actions">
        <button className="link" onClick={onEdit}>Edit</button>
        <button className="link danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
