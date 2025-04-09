function makeDiagonalRed(table) {
  // Получаем все строки таблицы
  const rows = table.rows;

  // Проходим по каждой строке
  for (let i = 0; i < rows.length; i++) {
    // Получаем ячейки в текущей строке
    const cells = rows[i].cells;
    
    // Находим диагональную ячейку (с индексом равным номеру строки)
    if (i < cells.length) { // Проверяем, чтобы не выйти за границы
      cells[i].style.backgroundColor = 'red';
    }
  }
}
