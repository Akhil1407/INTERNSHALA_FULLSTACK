// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');

// Track row currently being edited
let editingRow = null;

// Handle Add/Update
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('id').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validate inputs
    if (!name || !id || !email || !contact) {
        alert('All fields are required!');
        return;
    }

    if (!/^\d+$/.test(contact)) {
        alert('Contact number must be numeric!');
        return;
    }

    // If editing, update the row
    if (editingRow) {
        editingRow.cells[0].innerText = name;
        editingRow.cells[1].innerText = id;
        editingRow.cells[2].innerText = email;
        editingRow.cells[3].innerText = contact;
        editingRow = null; // Clear editingRow
    } else {
        // Add new row
        const newRow = studentTableBody.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td>${email}</td>
            <td>${contact}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        // Add event listeners to Edit and Delete buttons
        const editBtn = newRow.querySelector('.edit');
        const deleteBtn = newRow.querySelector('.delete');

        editBtn.addEventListener('click', () => editRow(newRow));
        deleteBtn.addEventListener('click', () => deleteRow(newRow));
    }

    // Clear input fields
    studentForm.reset();
});

// Edit Row
function editRow(row) {
    editingRow = row; // Set the row being edited
    document.getElementById('name').value = row.cells[0].innerText;
    document.getElementById('id').value = row.cells[1].innerText;
    document.getElementById('email').value = row.cells[2].innerText;
    document.getElementById('contact').value = row.cells[3].innerText;
}

// Delete Row
function deleteRow(row) {
    if (confirm('Are you sure you want to delete this record?')) {
        row.remove();
    }
}
