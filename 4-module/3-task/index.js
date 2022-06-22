function highlight(table) {
  for (let i = 1; i < table.rows.length; i++){
     let row = table.rows[i];

     if (+row.cells[1].textContent < 18) {
       row.style.textDecoration = 'line-through';
     }

     if (row.cells[2].textContent && row.cells[2].textContent == 'f') {
       row.classList.add('female');
     } else if (row.cells[2].textContent){
       row.classList.add('male');
     }

     switch (row.cells[3].dataset.available){
       case 'true' : row.classList.add('available');
       break;
       case 'false' : row.classList.add('unavailable');
       break;
       default: row.setAttribute('hidden', true);
     }
  }
}
