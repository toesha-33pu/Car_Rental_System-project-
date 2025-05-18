// Insurance plan selection functionality
const insuranceCards = document.querySelectorAll('.insurance-card');

insuranceCards.forEach(card => {
    const selectButton = card.querySelector('.btn-primary');
    selectButton.addEventListener('click', (e) => {
        e.preventDefault();
        const planType = card.querySelector('h3').textContent;
        // Store selected plan in session storage for booking process
        sessionStorage.setItem('selectedInsurancePlan', planType);
        // Redirect to booking page
        window.location.href = 'booking.html';
    });
});

// FAQ section interaction
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('h4');
    const answer = item.querySelector('p');
    
    // Initially hide answers
    answer.style.display = 'none';
    
    question.addEventListener('click', () => {
        // Toggle answer visibility
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
        
        // Add visual indicator for expanded state
        question.style.color = isVisible ? 'var(--primary-color)' : 'var(--text-color)';
    });
});

// Coverage comparison table highlighting
const comparisonTable = document.querySelector('.comparison-table');
if (comparisonTable) {
    const rows = comparisonTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'var(--light-gray)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
}