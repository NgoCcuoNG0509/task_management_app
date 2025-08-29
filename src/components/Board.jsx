import React from 'react';
import Column from './Column';

const COLUMNS = [
  { key: 'todo', title: 'To Do' },
  { key: 'inprogress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
];

export default function Board({ tasks = [], onEdit, onDelete, onMove, onUpdate }){
  return (
    <div className="board">
      {COLUMNS.map(col => (
        <Column
          key={col.key}
          status={col.key}
          title={col.title}
          tasks={tasks.filter(t => t.status === col.key)}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}
