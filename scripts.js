const clients = [
  {
    id: '1',
    fullName: 'Jane Doe',
    createdAt: '2024-11-01 10:00',
    updatedAt: '2024-11-10 15:30',
    contactMethods: ['email', 'phone'],
    email: 'jane.doe@example.com',
    phone: '+7(123)456-78-90',
  },
  {
    id: '2',
    fullName: 'John Smith',
    createdAt: '2024-10-15 12:45',
    updatedAt: '2024-11-20 09:10',
    contactMethods: ['phone'],
    phone: '+7(987)654-32-10',
  },
  {
    id: '3',
    fullName: 'Bruss Leme',
    createdAt: '2024-02-17 17:30',
    updatedAt: '2024-11-20 18:00',
    contactMethods: ['email', 'phone'],
    email: 'bruss.leme@example.com',
    phone: '+7(205)794-09-58',
  },
];


let editedClient = null;
let clientToDelete = null;

function sortClients(column, order) {
  clients.sort((a, b) => {
    let valueA = a[column];
    let valueB = b[column];

    if (column === 'createdAt' || column === 'updatedAt') {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }

    return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
  });

  loadClients();
}

function loadClients() {
  const clientList = document.getElementById('client-list');
  clientList.innerHTML = '';

  clients.forEach((client) => {
    const row = document.createElement('tr');

    // ID
    const idCell = document.createElement('td');
    idCell.textContent = client.id;
    row.appendChild(idCell);

    // Полное имя
    const nameCell = document.createElement('td');
    nameCell.textContent = client.fullName;
    row.appendChild(nameCell);

    // Дата регистрации
    const createdCell = document.createElement('td');
    createdCell.textContent = client.createdAt;
    row.appendChild(createdCell);

    // Редактировано
    const updatedCell = document.createElement('td');
    updatedCell.textContent = client.updatedAt;
    row.appendChild(updatedCell);

    // Контакты
    const contactCell = document.createElement('td');
    client.contactMethods.forEach((method) => {
      const icon = document.createElement('img');
      icon.alt = method;
      icon.src = method === 'email' ? './icons/mail.png' : './icons/phone.png';
      icon.style.width = '16px';
      icon.style.height = '16px';
      icon.style.marginRight = '8px';

      // Добавляем tooltip
      const tooltipText =
        method === 'email'
          ? `Email: ${client.email || 'Not Provided'}`
          : `Phone: ${client.phone || 'Not Provided'}`;
      icon.title = tooltipText;

      // Иконка телефону
      contactCell.appendChild(icon);
    });
    row.appendChild(contactCell);

    // Действия
    const actionCell = document.createElement('td');
    actionCell.classList.add('action-buttons');

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    const editIcon = document.createElement('img');
    editIcon.src = './icons/edit.png';
    editIcon.alt = 'Edit';

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './icons/delete.png';
    deleteIcon.alt = 'Delete';

    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);

    editButton.addEventListener('click', () => openEditModal(client));
    deleteButton.addEventListener('click', () => openDeleteModal(client));

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);

    clientList.appendChild(row);
  });
}


function openEditModal(client) {
  editedClient = client;

  document.getElementById('client-id').value = client.id;
  document.getElementById('client-fullname').value = client.fullName;
  document.getElementById('client-created-at').value = client.createdAt;
  document.getElementById('client-updated-at').value = client.updatedAt;
  document.getElementById('client-contacts').value = client.contactMethods.join(',');

  document.getElementById('edit-modal').classList.remove('hidden');
}

function saveClientEdits() {
  editedClient.fullName = document.getElementById('client-fullname').value;
  editedClient.updatedAt = document.getElementById('client-updated-at').value;
  editedClient.contactMethods = document
    .getElementById('client-contacts')
    .value.split(',');

  document.getElementById('edit-modal').classList.add('hidden');
  loadClients();
}

function openDeleteModal(client) {
  clientToDelete = client;
  document.getElementById('delete-modal').classList.remove('hidden');
}

function confirmDelete() {
  const index = clients.indexOf(clientToDelete);
  if (index > -1) {
    clients.splice(index, 1);
  }

  document.getElementById('delete-modal').classList.add('hidden');
  loadClients();
}

// Переменные для функции "Добавить клиента"
let newClient = null;

function openAddModal() {
  // Сброс модальных входов
  document.getElementById('new-client-fullname').value = '';
  document.getElementById('new-client-created-at').value = '';
  document.getElementById('new-client-contact-methods').value = '';

  // Показать модальное окно
  document.getElementById('add-modal').classList.remove('hidden');
}

function saveNewClient() {
  const fullName = document.getElementById('new-client-fullname').value;
  const createdAt = document.getElementById('new-client-created-at').value;
  const contactMethods = Array.from(
    document.getElementById('new-client-contact-methods').selectedOptions
  ).map((option) => option.value);

  // Validate the form
  if (!fullName || !createdAt) {
    alert('Пожалуйста заполните все поля.');
    return;
  }

  // Создание айди для нового клиента
  const newId = String(clients.length + 1);

  // Создание данных нового клиента
  newClient = {
    id: newId,
    fullName,
    createdAt,
    updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    contactMethods,
  };

  // Добавление нового клиента в список
  clients.push(newClient);

  // Спрятать модальное окно
  document.getElementById('add-modal').classList.add('hidden');

  // Перезагрузка списка клиентов
  loadClients();
}

document.addEventListener('DOMContentLoaded', () => {

  // Add Client button click
  document.querySelector('.add-client-button').addEventListener('click', openAddModal);

  document.getElementById('add-client-form').addEventListener('submit', (event) => {
    event.preventDefault();
    saveNewClient();
  });

  // Cancel button in Add Client modal
  document.querySelector('#add-modal .cancel-button').addEventListener('click', () => {
    document.getElementById('add-modal').classList.add('hidden');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  loadClients();

  document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredClients = clients.filter((client) =>
      client.fullName.toLowerCase().includes(query)
    );
    loadClients(filteredClients);
  });

  document.querySelectorAll('.sort-button').forEach((button) => {
    button.addEventListener('click', () => {
      const column = button.getAttribute('data-column');
      const order = button.getAttribute('data-order');

      const newOrder = order === 'asc' ? 'desc' : 'asc';
      button.setAttribute('data-order', newOrder);

      sortClients(column, newOrder);
    });
  });

  document
    .getElementById('edit-client-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      saveClientEdits();
    });

  document
    .getElementById('cancel-delete')
    .addEventListener('click', () => {
      document.getElementById('delete-modal').classList.add('hidden');
    });

  document
    .getElementById('confirm-delete')
    .addEventListener('click', confirmDelete);

  document
    .querySelectorAll('.cancel-button')
    .forEach((button) =>
      button.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach((modal) => {
          modal.classList.add('hidden');
        });
      })
    );
});
