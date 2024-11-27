const clients = [
    {
      id: '1',
      fullName: 'Jane Doe',
      createdAt: '2024-11-01 10:00',
      updatedAt: '2024-11-10 15:30',
      contactMethods: ['email', 'phone'],
    },
    {
      id: '2',
      fullName: 'John Smith',
      createdAt: '2024-10-15 12:45',
      updatedAt: '2024-11-20 09:10',
      contactMethods: ['phone'],
    },
    {
      id: '3',
      fullName: 'Bruss Leme',
      createdAt: '2024-02-17 17:30',
      updatedAt: '2024-11-20 18:00',
      contactMethods: ['email', 'phone'],
    },
  ];
  
  let editedClient = null;
  let clientToDelete = null;
  
  // Load and display clients
  function loadClients() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';
  
    clients.forEach((client) => {
      const row = document.createElement('tr');
  
      // ID
      const idCell = document.createElement('td');
      idCell.textContent = client.id;
      row.appendChild(idCell);
  
      // Full Name
      const nameCell = document.createElement('td');
      nameCell.textContent = client.fullName;
      row.appendChild(nameCell);
  
      // Created At
      const createdCell = document.createElement('td');
      createdCell.textContent = client.createdAt;
      row.appendChild(createdCell);
  
      // Updated At
      const updatedCell = document.createElement('td');
      updatedCell.textContent = client.updatedAt;
      row.appendChild(updatedCell);
  
      // Contacts
      const contactCell = document.createElement('td');
      client.contactMethods.forEach((method) => {
        const icon = document.createElement('img');
        icon.alt = method;
        icon.src = method === 'email' ? './icons/mail.png' : './icons/phone.png';
        icon.style.width = '16px';
        icon.style.height = '16px';
        icon.style.marginRight = '8px';
        contactCell.appendChild(icon);
      });
      row.appendChild(contactCell);
  
      // Actions
      const actionCell = document.createElement('td');
      actionCell.classList.add('action-buttons');
  
      const editButton = document.createElement('button');
      const editIcon = document.createElement('img');
      editIcon.src = './icons/edit.png';
      editIcon.alt = 'Edit';
  
      editButton.appendChild(editIcon);
      editButton.addEventListener('click', () => openEditModal(client)); // Open edit modal
      actionCell.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      const deleteIcon = document.createElement('img');
      deleteIcon.src = './icons/delete.png';
      deleteIcon.alt = 'Delete';
  
      deleteButton.appendChild(deleteIcon);
      deleteButton.addEventListener('click', () => openDeleteModal(client)); // Open delete modal
      actionCell.appendChild(deleteButton);
  
      row.appendChild(actionCell);
  
      clientList.appendChild(row);
    });
  }
  
  // Open edit modal
  function openEditModal(client) {
    editedClient = client;
  
    document.getElementById('client-id').value = client.id;
    document.getElementById('client-fullname').value = client.fullName;
    document.getElementById('client-created-at').value = client.createdAt;
    document.getElementById('client-updated-at').value = client.updatedAt;
    document.getElementById('client-contacts').value = client.contactMethods.join(',');
  
    document.getElementById('edit-modal').classList.remove('hidden');
  }
  
  // Close edit modal
  function closeEditModal() {
    editedClient = null;
    document.getElementById('edit-modal').classList.add('hidden');
  }
  
  // Save client changes
  document.getElementById('edit-client-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const fullName = document.getElementById('client-fullname').value;
    const updatedAt = document.getElementById('client-updated-at').value;
    const contactMethods = Array.from(document.getElementById('client-contacts').selectedOptions).map(opt => opt.value);
  
    editedClient.fullName = fullName;
    editedClient.updatedAt = updatedAt;
    editedClient.contactMethods = contactMethods;
  
    closeEditModal();
    loadClients();
  });
  
  // Open delete modal
  function openDeleteModal(client) {
    clientToDelete = client;
    document.getElementById('delete-modal').classList.remove('hidden');
  }
  
  // Close delete modal
  function closeDeleteModal() {
    clientToDelete = null;
    document.getElementById('delete-modal').classList.add('hidden');
  }
  
  // Confirm delete
  document.getElementById('confirm-delete').addEventListener('click', () => {
    if (clientToDelete) {
      const index = clients.indexOf(clientToDelete);
      if (index !== -1) {
        clients.splice(index, 1);
        loadClients();
      }
    }
    closeDeleteModal();
  });
  
  // Cancel delete
  document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);
  
  // Cancel edit
  document.querySelector('.cancel-button').addEventListener('click', closeEditModal);
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', loadClients);
  