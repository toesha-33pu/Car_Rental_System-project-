// Price calculator functionality
function calculatePrice() {
    const carType = document.getElementById('car-type').value;
    const days = parseInt(document.getElementById('rental-days').value);
    const insurance = document.getElementById('insurance').value;

    let basePrice = 0;
    switch(carType) {
        case 'economy': basePrice = 49; break;
        case 'compact': basePrice = 69; break;
        case 'luxury': basePrice = 129; break;
        case 'suv': basePrice = 89; break;
    }

    let insurancePrice = 0;
    switch(insurance) {
        case 'basic': insurancePrice = 10; break;
        case 'comprehensive': insurancePrice = 20; break;
        case 'full': insurancePrice = 30; break;
    }

    const totalPrice = (basePrice + insurancePrice) * days;
    document.getElementById('total-price').textContent = `Total: $${totalPrice}`;
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Attach the calculate price function to the calculator button
    const calculateButton = document.querySelector('.calculator button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculatePrice);
    }

    // Add input event listeners for real-time calculation
    const inputs = ['car-type', 'rental-days', 'insurance'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', calculatePrice);
        }
    });
});

// Add event listeners to form inputs
const formInputs = ['car-type', 'rental-days', 'insurance'];
formInputs.forEach(inputId => {
    const element = document.getElementById(inputId);
    if (element) {
        element.addEventListener('change', () => calculator.calculateTotal());
        element.addEventListener('input', () => calculator.calculateTotal());
    }
});

// Initialize calculation on page load
document.addEventListener('DOMContentLoaded', () => {
    calculator.calculateTotal();
});

// Pricing plan selection
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    const planButton = card.querySelector('.btn-primary');
    planButton.addEventListener('click', (e) => {
        e.preventDefault();
        const planType = card.querySelector('h3').textContent;
        // Store selected plan in session storage
        sessionStorage.setItem('selectedPricingPlan', planType);
        // Redirect to booking page
        window.location.href = 'booking.html';
    });
});