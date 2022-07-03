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
  #table = document.createElement('table');

  constructor(rows) {
    this.rows = rows;
    this.elem;
    this.#createTableHead();
    this.#fillMainTable();
    this.#addClickListener();
  }

  get elem(){
    return this.#table;
  }

  #createTableHead(){
    if(this.#table.childElementCount > 0) return;

    const headRow = "<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>";
    const tHead = document.createElement('tHead');

    tHead.innerHTML = headRow;
    this.#table.append(tHead);
  }

  #fillMainTable(){
    const tBody = document.createElement('tBody');

    if (this.rows.length == 0) return;

    for (let worker of this.rows){
      let rowWorkerData;

      rowWorkerData = this.createRow(worker);
      tBody.append(rowWorkerData);
    }

    this.#table.append(tBody);
  }

  createRow(obj){
    if(!obj.name || !obj.age) console.log('неправильный формат данныx. требуется {name, age, salary, city}');

    let {name, age, salary, city} = obj;
    const rowElement = document.createElement('tr');
    const rowInnerString = `<td>${name}</td><td>${age}</td><td>${salary}</td><td>${city}</td><td><button>X</button></td>`;

    rowElement.innerHTML = rowInnerString;
    return rowElement;
  }

  #addClickListener(){
    this.#table.addEventListener('click', (event)=>{
      let target= event.target;

      if(target.tagName != 'BUTTON') return;

      target.closest('tr').remove();
    });
  }

}
