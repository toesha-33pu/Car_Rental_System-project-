
const vehicles = [
    {
        id: 1,
        name: 'Tesla Model 3',
        category: 'sedan',
        brand: 'tesla',
        price: 150,
        image: '../images/tesla-model-3.jpg',
        specs: {
            seats: '5',
            transmission: 'Automatic',
            range: '350 miles',
            charging: '30 min'
        },
        available: true
    },
    {
        id: 2,
        name: 'BMW X5',
        category: 'suv',
        brand: 'bmw',
        price: 200,
        image: '../images/bmw-x5.jpg',
        specs: {
            seats: '7',
            transmission: 'Automatic',
            engine: '3.0L V6',
            fuel: 'Diesel'
        },
        available: true
    },
    // Add more vehicles as needed
];

// Filter functionality
const filters = {
    category: document.getElementById('category'),
    brand: document.getElementById('brand'),
    price: document.getElementById('price'),
    priceValue: document.getElementById('priceValue')
};

// Update price slider value display
filters.price.addEventListener('input', () => {
    filters.priceValue.textContent = `$${filters.price.value}`;
});

// Filter vehicles based on selected criteria
function filterVehicles() {
    const selectedCategory = filters.category.value;
    const selectedBrand = filters.brand.value;
    const maxPrice = parseInt(filters.price.value);

    return vehicles.filter(vehicle => {
        const categoryMatch = !selectedCategory || vehicle.category === selectedCategory;
        const brandMatch = !selectedBrand || vehicle.brand === selectedBrand;
        const priceMatch = vehicle.price <= maxPrice;

        return categoryMatch && brandMatch && priceMatch;
    });
}

// Create vehicle card HTML
function createVehicleCard(vehicle) {
    return `
        <div class="vehicle-card">
            <img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-image">
            <div class="vehicle-info">
                <h3 class="vehicle-name">${vehicle.name}</h3>
                <div class="vehicle-specs">
                    ${Object.entries(vehicle.specs)
                        .map(([key, value]) => `<div class="spec-item">${key}: ${value}</div>`)
                        .join('')}
                </div>
                <div class="vehicle-price">$${vehicle.price}/day</div>
                <div class="vehicle-actions">
                    <button class="btn-book primary" onclick="bookVehicle(${vehicle.id})">
                        Book Now
                    </button>
                    <button class="btn-book secondary" onclick="viewDetails(${vehicle.id})">
                        Details
                    </button>
                </div>
            </div>
            <div class="availability-badge ${vehicle.available ? 'available' : 'unavailable'}">
                ${vehicle.available ? 'Available' : 'Unavailable'}
            </div>
        </div>
    `;
}

// Update vehicles display
function updateVehiclesDisplay() {
    const filteredVehicles = filterVehicles();
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    
    vehiclesGrid.innerHTML = filteredVehicles.length
        ? filteredVehicles.map(createVehicleCard).join('')
        : '<p>No vehicles match your criteria.</p>';
}

// Add event listeners to filters
Object.values(filters).forEach(filter => {
    if (filter) {
        filter.addEventListener('change', updateVehiclesDisplay);
    }
});

function bookVehicle(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle && vehicle.available) {
        // Store selected vehicle in session storage
        sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
        // Redirect to booking page
        window.location.href = 'booking.html';
    }
}

// View details functionality
function viewDetails(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
        // Store vehicle details in session storage
        sessionStorage.setItem('vehicleDetails', JSON.stringify(vehicle));
       
        alert(`${vehicle.name}\nCategory: ${vehicle.category}\nBrand: ${vehicle.brand}\nPrice: $${vehicle.price}/day`);
    }
}

document.addEventListener('DOMContentLoaded', updateVehiclesDisplay);