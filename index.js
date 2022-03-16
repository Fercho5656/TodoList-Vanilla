import {
  createSelectOption,
  createList,
  createListItem
} from '.scripts/createElements.js'

const $ = e => document.querySelector(e)

const todoInput = $('#todoInput')
const todoSelect = $('#todoSelect')
const addTodoBtn = $('#addTodoBtn')
const todoList = $('#todoList')

const todoCategories = {
  pending: [],
  work: [],
  exams: []
}

Object.keys(todoCategories).forEach(category => {
  const option = createSelectOption(category, category)
  todoSelect.appendChild(option)
  const listTitle = category.charAt(0).toUpperCase() + category.slice(1)
  const list = createList(listTitle, todoCategories[category])
  todoList.appendChild(list)
})

addTodoBtn.addEventListener('click', () => {
  const { value } = todoInput
  const { value: categorySelect } = todoSelect
  const category = todoCategories[categorySelect]
  if (categorySelect === 'Category') return alert('Select a category')

  const listItem = createListItem(value)
  const deleteButton = document.createElement('button')
  deleteButton.textContent = '❌'

  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
      listItem.remove()

      // Removes item from array
      category.splice(category.indexOf(value), 1)
    }
  })

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('crossed')
    Object.values(category).forEach(item => {
      if (item.todo === value) item.completed = !item.completed
    })
  })
  category.push({ todo: value, completed: false })
  const list = $(`#${categorySelect}`)

  listItem.appendChild(deleteButton)
  list.appendChild(listItem)
})
