import {
  createSelectOption,
  createList,
  removeElements
} from './createElements.js'

const $ = e => document.querySelector(e)
const $$ = e => document.querySelectorAll(e)

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
  const capitalLetter =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  const option = createSelectOption(category, capitalLetter)
  todoSelect.appendChild(option)
})

const renderLists = () => {
  Object.keys(todoCategories).forEach(category => {
    const list = createList(category, todoCategories[category])
    todoList.appendChild(list)
  })
}
renderLists()

addTodoBtn.addEventListener('click', () => {
  if (todoInput.value.trim() === '') return alert('Please enter a todo')

  if (todoSelect.value === 'Category') return alert('Please select a category')

  todoCategories[todoSelect.value].push(todoInput.value)
  todoInput.value = ''
  removeElements($$('#todoList ul'))
  renderLists()
})
