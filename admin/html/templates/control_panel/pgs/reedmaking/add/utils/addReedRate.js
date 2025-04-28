function addReedRate() {
  const rateInputTable = document.getElementsByClassName('displayRatesInputTable')[0];
  const tbody = rateInputTable.querySelector('tbody');
  const nameInput = document.getElementById('nameInput');
  const priceInput = document.getElementById('priceInput');

  // Create new table row, data elements and text nodes
  //  Row
  const row = document.createElement('tr');
  //  TDs
  const quantityTD = document.createElement('td');
  const priceTD = document.createElement('td');
  const deleteTD = document.createElement('td');
  //  TextNodes
  const quantityTN = document.createTextNode(nameInput.value);
  const priceInputFormatted = parseFloat(priceInput.value).toFixed(2);
  const priceTN = document.createTextNode('$' + priceInputFormatted);

  // Create element for the trashcan icon
  const deleteIcon = document.createElement('i');
  deleteIcon.setAttribute('class','far fa-trash-alt');

  // Add event listener for delete row
  deleteIcon.addEventListener('click',(e) => {
    const paths = e.composedPath();
    const row = paths[2];
    row.remove();
  },{ once: true });

  // Add values to TD elements and add to row
  quantityTD.appendChild(quantityTN);
  priceTD.appendChild(priceTN);
  deleteTD.appendChild(deleteIcon);

  row.appendChild(quantityTD);
  row.appendChild(priceTD);
  row.appendChild(deleteTD);

  tbody.appendChild(row);

  // Clear inputs
  nameInput.value = '';
  priceInput.value = '';
}