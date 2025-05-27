// Form validation logic
document.addEventListener('DOMContentLoaded', () => {
    // Generic form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'This field is required');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    function showError(input, message) {
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    // Form validation for fuel tracking
    document.getElementById('fuelForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = document.getElementById('fuelDate').value;
        const odometer = document.getElementById('odometer').value;
        const fuelAmount = document.getElementById('fuelAmount').value;
    
        if (!date || !odometer || !fuelAmount) {
            alert('Please fill in all required fields');
            return;
        }
    
        if (odometer < 0 || fuelAmount <= 0) {
            alert('Please enter valid numeric values');
            return;
        }
    
        // Simulate successful submission
        alert('Fuel entry saved successfully!');
        e.target.reset();
    });
});