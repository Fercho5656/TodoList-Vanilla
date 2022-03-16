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

export const createListItem = text => {
  const listItem = document.createElement('li')
  const textItem = document.createElement('p')
  textItem.textContent = text
  listItem.appendChild(textItem)
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
