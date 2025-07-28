# Cart Functionality Implementation

This implementation provides a complete shopping cart system for the ClassKart React application, similar to the functionality seen on https://classeskart.in/483/cs-amit-vohra.

## Features Implemented

### 1. Cart Context (CartContext.jsx)
- Global state management for cart items
- Persistent cart storage using localStorage
- Cart operations: Add, Remove, Update quantity, Clear cart
- Automatic price calculations including discounts

### 2. Cart Components

#### CartSidebar.jsx
- Sliding sidebar cart interface
- Item quantity management
- Price calculations with discounts
- Clear cart and checkout functionality
- Responsive design for mobile and desktop

#### CartIcon.jsx
- Fixed position cart icon with item count badge
- Shows total cart value
- Toggles cart sidebar on click

#### CheckoutPage.jsx
- Multi-step checkout process
- Order summary with tax calculations
- Billing information form
- Payment method selection (Card, Net Banking, UPI)
- Order confirmation

### 3. Enhanced TestSeriesShowcaseSection.jsx
- Integrated cart functionality
- Visual feedback for items in cart
- Add to cart buttons with state management
- Success notifications using Snackbar

## Setup Instructions

### 1. Install Required Dependencies
Make sure you have these Material-UI components installed:

```bash
npm install @mui/material @mui/icons-material
npm install react-router-dom
```

### 2. Wrap Your App with CartProvider
Update your main App component or routing component:

```jsx
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Your app content */}
      </Router>
    </CartProvider>
  );
}
```

### 3. Add Routes
Add the checkout route to your router:

```jsx
import CheckoutPage from './components/CheckoutPage';

// In your Routes component
<Route path="/checkout" element={<CheckoutPage />} />
```

### 4. Update Your TestSeriesShowcaseSection Usage
The component now automatically includes cart functionality. Just ensure it's wrapped by CartProvider.

## Component Usage

### Using the Cart Context
```jsx
import { useCart } from './context/CartContext';

function MyComponent() {
  const { 
    items,           // Array of cart items
    total,           // Total cart value
    itemCount,       // Total number of items
    addToCart,       // Function to add item
    removeFromCart,  // Function to remove item
    updateQuantity,  // Function to update quantity
    clearCart,       // Function to clear cart
    toggleCart,      // Function to toggle cart sidebar
    isOpen          // Cart sidebar open state
  } = useCart();
}
```

### Adding Items to Cart
Items should have this structure:
```jsx
const testSeriesItem = {
  id: 1,
  title: "Test Series Name",
  description: "Description",
  type: "mock", // or "practice"
  price: 1500,
  discount: 20, // percentage
  paid: true, // or false for free
  questionsCount: 100,
  duration: "3 hours"
};

addToCart(testSeriesItem);
```

## Features

### Cart Persistence
- Cart items are automatically saved to localStorage
- Cart persists across browser sessions
- Automatically restored on app reload

### Price Calculations
- Automatic discount calculations
- Tax calculations (18% GST)
- Real-time total updates

### Responsive Design
- Mobile-friendly cart sidebar
- Responsive checkout forms
- Touch-friendly quantity controls

### User Experience
- Visual feedback for cart actions
- Loading states and animations
- Success/error notifications
- Disabled states for items already in cart

## Customization

### Styling
All components use Material-UI's sx prop for styling. You can easily customize colors, spacing, and layout by modifying the sx objects.

### Payment Integration
The checkout page includes payment method selection. You can integrate with actual payment gateways by:

1. Adding payment gateway SDKs
2. Implementing payment processing in the `handleSubmitOrder` function
3. Adding proper validation and error handling

### Additional Features
You can extend the cart functionality by:

- Adding coupon/promo code support
- Implementing user authentication
- Adding order history
- Implementing email notifications
- Adding inventory management

## API Integration

The cart system is designed to work with your existing API structure. Update the `handleSubmitOrder` function in CheckoutPage.jsx to integrate with your backend:

```jsx
const handleSubmitOrder = async () => {
  try {
    const orderData = {
      items,
      userDetails: formData,
      paymentMethod,
      total: finalTotal
    };
    
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    if (response.ok) {
      clearCart();
      handleNext(); // Move to confirmation step
    }
  } catch (error) {
    console.error('Order submission failed:', error);
  }
};
```

## Testing

Test the cart functionality by:

1. Adding items to cart from test series listings
2. Verifying cart persistence across page reloads
3. Testing quantity updates and item removal
4. Completing the checkout process
5. Testing responsive behavior on mobile devices

The cart system provides a complete e-commerce experience for your test series platform, matching the functionality of professional educational platforms.
