export const saveTodos = (todoCategories) =>
  localStorage.setItem('todos', JSON.stringify(todoCategories))
export const loadTodos = () => localStorage.getItem('todos')
