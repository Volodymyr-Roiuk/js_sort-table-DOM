'use strict';

class SortHtmlTable {
  constructor(id) {
    this.table = document.querySelector(`#${id}`);
    this.isSorted = null;
    this.sortColumn = null;
  }

  clickEvent(e) {
    if (!e.target.dataset.type) { return; }
    const eventElement = e.target;
    const tableRows = [...this.table.querySelectorAll('tr')];
    const headerRow = tableRows.splice(0, 1)[0];
    const columnIndex = eventElement.cellIndex;

    if (this.sortColumn === columnIndex) {
      // this.isSorted = this.isSorted ? false : true;
      if (this.isSorted) {
        this.isSorted = false;
      } else {
        this.isSorted = true;
      }
    } else {
      this.sortColumn = columnIndex;
      this.isSorted = true;
    }
    const sortNum = this.isSorted ? 1 : -1;

    for (const headerCol of headerRow.children) {
      if (headerCol === eventElement) {
        headerCol.style.cssText = 'background-color: lightGreen';
      } else {
        headerCol.style.cssText = '';
      }
    }

    tableRows.sort((a, b) => {
      switch (eventElement.dataset.type) {
        case 'string': {
          return sortNum * (a.cells[columnIndex].textContent
            .localeCompare(b.cells[columnIndex].textContent));
        }
        case 'number': {
          return sortNum * (a.cells[columnIndex].textContent
            - b.cells[columnIndex].textContent);
        }
      }
    });

    for (const row of tableRows) {
      this.table.appendChild(row);
    }
  }

  addEvents() {
    this.table.addEventListener('click', this.clickEvent.bind(this));
  }
}

const sortTable = new SortHtmlTable('cars');
sortTable.addEvents();
