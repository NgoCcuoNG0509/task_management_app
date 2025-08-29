const KEY = 'tasks-v1';

export function loadTasks(){
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){
    console.error('loadTasks error', e);
    return [];
  }
}

export function saveTasks(tasks){
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch(e){
    console.error('saveTasks error', e);
  }
}
