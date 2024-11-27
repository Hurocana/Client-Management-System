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
        icon.src = method === 'email'
          ? './icons/mail.png'
          : './icons/phone.png'
          , './icons/phone.png';
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
      const deleteButton = document.createElement('button');
  
      const editIcon = document.createElement('img');
      editIcon.src = './icons/edit.png';
      editIcon.alt = 'Edit';
  
      const deleteIcon = document.createElement('img');
      deleteIcon.src = './icons/delete.png';
      deleteIcon.alt = 'Delete';
  
      editButton.appendChild(editIcon);
      deleteButton.appendChild(deleteIcon);
  
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
  
      row.appendChild(actionCell);
  
      clientList.appendChild(row);
    });
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    loadClients();
  
    document.getElementById('search').addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase();
      const filteredClients = clients.filter(client =>
        client.fullName.toLowerCase().includes(query)
      );
      loadClients(filteredClients);
    });
  });
  