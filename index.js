//'https://dragonball-api.com/api/characters?page=1&limit=50'
let items = [];

fetch('https://dragonball-api.com/api/characters?page=1&limit=50')
  .then(res => res.json())
  .then(data => {
    // data.items is the array of characters
    items = data.items;
    
    const images = data.items.map(item => item.image);
    // Now you can display them:

    const container = document.getElementById('image-container'); // Make sure this exists in your HTML
    container.innerHTML = data.items.map((item, idx) => `
      <div class="character__card">
        <p><b>Name:</b> ${item.name}</p>
        <img src="${item.image}" alt="${item.name}">
        <button class="view-info-btn" data-idx="${idx}">View Info</button>
      </div>
    `).join('');

    // Add event listeners to all view info buttons
    document.querySelectorAll('.view-info-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = this.getAttribute('data-idx');
        const char = items[idx];
        showCharacterModal(char);
      });
    });
  });

document.getElementById('search__btn').addEventListener('click', function() {
  const query = document.getElementById('search__input').value.toLowerCase();
  showSkeletons(); // Show skeletons immediately
  setTimeout(() => {
    const filtered = items.filter(char =>
      char.name.toLowerCase().includes(query)
    );
    renderItems(filtered); // Render results after delay
  }, 700); // Simulate loading delay
});

function renderItems(itemsArr) {
  const container = document.getElementById('image-container');
  container.innerHTML = itemsArr.map((item, idx) => `
    <div class="character__card">
      <p><b>Name:</b> ${item.name}</p>
      <img src="${item.image}" alt="${item.name}">
      <button class="view-info-btn" data-idx="${items.indexOf(item)}">View Info</button>
    </div>
  `).join('');
  document.querySelectorAll('.view-info-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-idx');
      const char = items[idx];
      showCharacterModal(char);
    });
  });
}

// Modal logic
function showCharacterModal(char) {
  const modal = document.getElementById('character-modal');
  const info = document.getElementById('modal-info');
  info.innerHTML = `
    <h2>${char.name}</h2>
    <img src="${char.image}" alt="${char.name}" style="max-width:120px;display:block;margin:0 auto 16px;">
    <p><b>Ki:</b> ${char.ki}</p>
    <p><b>Max Ki:</b> ${char.maxKi}</p>
    <p><b>Race:</b> ${char.race}</p>
    <p><b>Gender:</b> ${char.gender}</p>
    <p><b>Affiliation:</b> ${char.affiliation}</p>
  `;
  modal.style.display = 'flex';
}

// Close modal logic
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('character-modal');
  const closeBtn = document.getElementById('close-modal');
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    };
  }
  // Close modal when clicking outside content
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
});

function showSkeletons(count = 5) {
  const container = document.getElementById('image-container');
  container.innerHTML = Array(count).fill('<div class="skeleton-card"></div>').join('');
}

//<div class="character__info">
      //   <p><b>ki:</b> ${item.ki}</p>
      //   <p><b>maxKi:</b> ${item.maxKi}</p>
      //   <p><b>Race:</b> ${item.race}</p>
      //   <p><b>Gender:</b> ${item.gender}</p>
      //   <p><b>Affiliation:</b> ${item.affiliation}</p>
      // </div> 
