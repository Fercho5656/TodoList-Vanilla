import {
  createSelectOption,
  createList,
  createListItem,
  createParagraph
} from './scripts/createElements.js'

import { loadTodos, saveTodos } from './scripts/state.js'

const $ = e => document.querySelector(e)

const todoInput = $('#todoInput')
const addTodoBtn = $('#addTodoBtn')
const todoList = $('#todoList')

const todoCategories = JSON.parse(loadTodos()) || {
  string: [],
  boolean: [],
  int: [],
  float: []
}

window.addEventListener('load', () => {
  Object.keys(todoCategories).forEach(category => {
    const list = createList(category, todoCategories[category])

    // Fills every list
    todoCategories[category].forEach(item => {
      const listItem = createTodoItem(item.todo, todoCategories[category])
      list.appendChild(listItem)
    })

    todoList.appendChild(list)
  })
})

addTodoBtn.addEventListener('click', () => {
  const value = autoParse(todoInput.value)
  console.log(value)
  const category = todoCategories[typeof value]
  if (typeof value === 'string') if (value.trim() === '') return

  const listItem = createTodoItem(value, category)

  category.push({ todo: value, completed: false })
  todoInput.value = ''
  const list = $(`#${typeof value}`)

  list.appendChild(listItem)
  saveTodos(todoCategories)
})

function createTodoItem (text, category) {
  const listItem = createListItem()
  const paragraph = createParagraph(text)

  const deleteButton = document.createElement('button')
  deleteButton.textContent = '❌'
  deleteButton.className = 'btn btn-delete'

  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
      listItem.remove()
      // Removes item from array
      category.splice(category.indexOf(text), 1)
      saveTodos(todoCategories)
    }
  })

  Object.values(category).forEach(item => {
    if (item.todo === text) {
      if (item.completed) {
        console.log(item.completed)
        paragraph.classList.add('crossed')
      }
    }
  })

  paragraph.addEventListener('click', () => {
    paragraph.classList.toggle('crossed')
    Object.values(category).forEach(item => {
      if (item.todo === text) item.completed = !item.completed
    })
    saveTodos(todoCategories)
  })

  listItem.appendChild(paragraph)
  listItem.appendChild(deleteButton)

  return listItem
}

function autoParse (value) {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === '') return ''
  if (Number.isNaN(Number(value))) return value
  return Number(value)
}
