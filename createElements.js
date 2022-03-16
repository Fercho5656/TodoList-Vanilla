const toggleCrossed = item => item.classList.toggle('crossed')

export const createHeader = title => {
  const header = document.createElement('h2')
  header.textContent = title
  return header
}

export const createSelectOption = (value, text) => {
  const option = document.createElement('option')
  option.value = value
  option.text = text
  return option
}

const createListItem = text => {
  const listItem = document.createElement('li')
  listItem.textContent = text
  listItem.addEventListener('click', () => toggleCrossed(listItem))
  return listItem
}

export const createList = (title, content) => {
  const list = document.createElement('ul')
  list.className = 'list'
  list.id = title
  const header = createHeader(title)
  list.appendChild(header)
  if (content) {
    content.forEach(item => {
      const listItem = createListItem(item)
      list.appendChild(listItem)
    })
  }
  return list
}

export const removeElements = elements => elements.forEach(e => e.remove())
