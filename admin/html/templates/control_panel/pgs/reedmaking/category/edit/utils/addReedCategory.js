function addReedCategory() {
  const categoryInputTable = document.querySelector('table');
  const tbody = categoryInputTable.querySelector('tbody');
  const optionInput = document.getElementById('optionInput');

  // Create new table row, data elements and text nodes
  //  Row
  const row = document.createElement('tr');
  //  TDs
  const optionTD = document.createElement('td');
  const deleteTD = document.createElement('td');
  //  TextNodes
  const optionTN = document.createTextNode(optionInput.value);

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
  optionTD.appendChild(optionTN);
  deleteTD.appendChild(deleteIcon);

  row.appendChild(optionTD);
  row.appendChild(deleteTD);

  tbody.appendChild(row);

  // Clear inputs
  optionInput.value = '';
}