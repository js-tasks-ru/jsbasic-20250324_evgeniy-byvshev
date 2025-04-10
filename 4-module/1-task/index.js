function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  
  for (const friend of friends) {
    // Создаем элемент li
    const li = document.createElement('li');
    // Заполняем текстовое содержимое li
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    // Добавляем li в ul
    ul.appendChild(li);
  }
  return ul;
}
