// Store tasks in localStorage for offline capability
export const getTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
  export const addTask = (task) => {
    const tasks = getTasks();
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return newTask;
  };
  
  export const toggleTaskCompletion = (id) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks;
  };
  
  export const deleteTask = (id) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks;
  };