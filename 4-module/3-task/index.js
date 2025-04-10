function highlight(table) {
  // Получаем все строки таблицы (исключая заголовок thead)
  const rows = table.querySelectorAll("tbody tr");

  for (const row of rows) {
    // Получаем ячейки текущей строки
    const cells = row.cells;

    // 1. Обработка статуса (data-available)
    const statusCell = cells[3]; // Ячейка Status (4-я по счету, индекс 3)
    if (statusCell.hasAttribute("data-available")) {
      const isAvailable = statusCell.dataset.available === "true";
      row.classList.add(isAvailable ? "available" : "unavailable");
    } else {
      row.hidden = true; // Скрываем строку, если атрибута нет
    }

    // 2. Обработка пола (Gender)
    const genderCell = cells[2]; // Ячейка Gender (3-я по счету, индекс 2)
    if (genderCell.textContent === "m") {
      row.classList.add("male");
    } else if (genderCell.textContent === "f") {
      row.classList.add("female");
    }

    // 3. Обработка возраста (Age)
    const ageCell = cells[1]; // Ячейка Age (2-я по счету, индекс 1)
    const age = parseInt(ageCell.textContent, 10);
    if (age < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
