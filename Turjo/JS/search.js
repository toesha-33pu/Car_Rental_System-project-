// Mock car data
const cars = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        features: ['Bluetooth', 'Backup Camera'],
        image: '../assets/images/car1.jpg',
        available: true
    },
    {
        id: 2,
        make: 'Honda',
        model: 'CR-V',
        category: 'SUV',
        features: ['AWD', 'Sunroof'],
        image: '../assets/images/car2.jpg',
        available: false
    }
];

// Pagination configuration
const resultsPerPage = 5;
let currentPage = 1;

function renderCars(filteredCars) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    
    filteredCars.slice((currentPage-1)*resultsPerPage, currentPage*resultsPerPage)
        .forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.make} ${car.model}">
                <h3>${car.make} ${car.model}</h3>
                <span class="availability ${car.available ? 'available' : 'unavailable'}">
                    ${car.available ? 'Available' : 'Unavailable'}
                </span>
                <p>Category: ${car.category}</p>
                <div class="features">
                    ${car.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                </div>
            `;
            resultsContainer.appendChild(carCard);
        });
    
    renderPagination(filteredCars.length);
}

function renderPagination(totalResults) {
    const pageCount = Math.ceil(totalResults / resultsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    for(let i = 1; i <= pageCount; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            applyFilters();
        });
        paginationContainer.appendChild(pageBtn);
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const featureFilter = document.getElementById('featureFilter').value;
    
    const filtered = cars.filter(car => {
        const matchesCategory = categoryFilter ? car.category === categoryFilter : true;
        const matchesFeature = featureFilter ? car.features.includes(featureFilter) : true;
        return matchesCategory && matchesFeature;
    });
    
    renderCars(filtered);
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('featureFilter').addEventListener('change', applyFilters);
    applyFilters();
});