document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interestForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Validate email if provided
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Disable the submit button
        submitBtn.disabled = true;
        
        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ name, email })
        })
        .then(response => {
            if (response.ok) {
                console.log('Form submitted:', { name, email });
                // Show success message
                successMessage.classList.remove('hidden');
            } else {
                console.error('Failed to submit');
                // Re-enable the button on error
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Re-enable the button on error
            submitBtn.disabled = false;
        });
    });
}); 