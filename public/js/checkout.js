// Cart data
const cart = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 2500, // in cents
        quantity: 1,
        size: "M",
        color: "Black"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the checkout
    initializeCheckout().catch(error => {
        console.error('Checkout initialization error:', error);
        showError('Unable to initialize checkout. Please try again later.');
    });

    // Add event listener for save card checkbox
    const saveCardCheckbox = document.getElementById('save-card-checkbox');
    if (saveCardCheckbox) {
        saveCardCheckbox.addEventListener('change', async () => {
            try {
                await initializeCheckout(); // Reinitialize with new save card preference
            } catch (error) {
                console.error('Failed to update save card preference:', error);
            }
        });
    }

    // Initialize Lucide icons if not already done
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
});

async function initializeCheckout() {
    try {
        // Update order summary first
        updateOrderSummary();

        // Get save card checkbox state
        const saveCardCheckbox = document.getElementById('save-card-checkbox');
        const saveCard = saveCardCheckbox ? saveCardCheckbox.checked : false;
        
        // Calculate total amount
        const amount = calculateTotal();
        
        // Create payment session
        const paymentSession = await createPaymentSession(amount, 'GBP', saveCard);

        if (!paymentSession) {
            throw new Error('Invalid payment session response');
        }

        // Show loading state
        const flowContainer = document.getElementById('flow-container');
        flowContainer.classList.add('loading');

        // Initialize CheckoutWebComponents with modern styling
        const checkout = await CheckoutWebComponents({
            publicKey: 'pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc',
            paymentSession: paymentSession,
            environment: 'sandbox',
            appearance: {
                theme: 'light',
                variables: {
                    colorPrimary: '#2563eb',
                    colorBackground: '#ffffff',
                    colorText: '#1f2937',
                    colorDanger: '#dc2626',
                    borderRadius: '0.5rem',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    fontWeightNormal: '400',
                    fontWeightMedium: '500',
                    fontWeightBold: '600',
                    spacingUnit: '4px',
                    borderWidth: '1px'
                },
                rules: {
                    '.Input': {
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        padding: '0.75rem',
                        fontSize: '14px'
                    },
                    '.Input:focus': {
                        borderColor: '#2563eb',
                        boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
                        outline: 'none'
                    },
                    '.Button': {
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        borderRadius: '0.375rem',
                        padding: '0.75rem 1.5rem',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    },
                    '.Button:hover': {
                        backgroundColor: '#1d4ed8'
                    },
                    '.Button:disabled': {
                        backgroundColor: '#93c5fd',
                        cursor: 'not-allowed'
                    }
                }
            },
            onReady: () => {
                console.log('Payment components ready');
                flowContainer.classList.remove('loading');
            },
            onPaymentCompleted: async (component, paymentResponse) => {
                console.log('Payment completed:', paymentResponse);
                showSuccess('Payment completed successfully! Redirecting...');
                
                // Redirect to success page after a short delay
                setTimeout(() => {
                    window.location.href = '/success';
                }, 1500);
            },
            onError: (component, error) => {
                console.error('Payment error:', error);
                showError(error.message || 'Payment failed. Please try again.');
                flowContainer.classList.remove('loading');
            }
        });

        // Create and mount the flow component
        const flowComponent = checkout.create('flow');
        await flowComponent.mount('#flow-container');

    } catch (error) {
        console.error('Checkout initialization error:', error);
        showError('Unable to initialize checkout. Please try again later.');
        throw error;
    }
}

async function createPaymentSession(amount, currency, saveCard) {
    try {
        const response = await fetch('/api/create-payment-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                currency,
                saveCard,
                reference: 'ORD-' + Math.random().toString(36).substr(2, 9),
                customer: {
                    email: 'john.doe@example.com',
                    name: 'John Doe'
                },
                success_url: window.location.origin + '/success',
                failure_url: window.location.origin + '/failure',
                billing: {
                    address: {
                        address_line1: '123 Test Street',
                        city: 'London',
                        state: 'LND',
                        zip: 'W1T 4TJ',
                        country: 'GB'
                    }
                },
                items: [{
                    name: "Classic T-Shirt",
                    quantity: 1,
                    unit_price: amount,
                    total_amount: amount,
                    reference: "SHIRT-123"
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create payment session');
        }

        return await response.json();
    } catch (error) {
        console.error('Payment session error:', error);
        throw error;
    }
}

function calculateTotal() {
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Add delivery cost (450 = £4.50)
    const deliveryCost = 450;
    
    // Return total in cents
    return subtotal + deliveryCost;
}

function formatPrice(amount) {
    // Convert cents to pounds and format with 2 decimal places
    return `£${(amount / 100).toFixed(2)}`;
}

function updateOrderSummary() {
    try {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const deliveryCost = 450; // £4.50 in cents

        // Update subtotal, delivery, and total displays
        const elements = {
            subtotal: document.querySelector('[data-summary="subtotal"]'),
            delivery: document.querySelector('[data-summary="delivery"]'),
            total: document.querySelector('[data-summary="total"]')
        };

        if (elements.subtotal) {
            elements.subtotal.textContent = formatPrice(subtotal);
        }
        
        if (elements.delivery) {
            elements.delivery.textContent = formatPrice(deliveryCost);
        }
        
        if (elements.total) {
            elements.total.textContent = formatPrice(subtotal + deliveryCost);
        }

    } catch (error) {
        console.error('Error updating order summary:', error);
    }
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    if (successElement) {
        successElement.classList.add('hidden');
    }

    // Scroll error into view
    errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showSuccess(message) {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (successElement) {
        successElement.textContent = message;
        successElement.classList.remove('hidden');
    }
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }

    // Scroll success message into view
    successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideMessages() {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
    
    if (successElement) {
        successElement.classList.add('hidden');
    }
}