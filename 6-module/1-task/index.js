/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this._elem = this._createTable();
  }

  get elem() {
    return this._elem;
  }

  _createTable() {
    const table = document.createElement('table');
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Имя', 'Возраст', 'Зарплата', 'Город', ''].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    
    this._rows.forEach((rowData, index) => {
      const row = document.createElement('tr');
      
      ['name', 'age', 'salary', 'city'].forEach(key => {
        const td = document.createElement('td');
        td.textContent = rowData[key];
        row.appendChild(td);
      });
      
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        row.remove();
      });
      
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    return table;
  }
}
