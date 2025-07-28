// import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// // Cart Context
// const CartContext = createContext();

// // Initial cart state
// const initialState = {
//     items: [],
//     isOpen: false,
//     total: 0,
//     itemCount: 0
// };

// // Cart actions
// const cartActions = {
//     ADD_TO_CART: 'ADD_TO_CART',
//     REMOVE_FROM_CART: 'REMOVE_FROM_CART',
//     UPDATE_QUANTITY: 'UPDATE_QUANTITY',
//     CLEAR_CART: 'CLEAR_CART',
//     TOGGLE_CART: 'TOGGLE_CART',
//     CALCULATE_TOTAL: 'CALCULATE_TOTAL'
// };

// // Cart reducer
// function cartReducer(state, action) {
//     let newState;
    
//     switch (action.type) {
//         case cartActions.ADD_TO_CART: {
//             const existingItem = state.items.find(item => item.id === action.payload.id);
            
//             if (existingItem) {
//                 // Item already in cart, update quantity
//                 const updatedItems = state.items.map(item =>
//                     item.id === action.payload.id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//                 newState = {
//                     ...state,
//                     items: updatedItems
//                 };
//             } else {
//                 // New item, add to cart
//                 const newItem = {
//                     ...action.payload,
//                     quantity: 1,
//                     finalPrice: action.payload.paid ? (
//                         action.payload.discount > 0 
//                             ? Number(action.payload.price) - (Number(action.payload.price) * (Number(action.payload.discount) / 100))
//                             : Number(action.payload.price)
//                     ) : 0
//                 };
//                 newState = {
//                     ...state,
//                     items: [...state.items, newItem]
//                 };
//             }
//             break;
//         }

//         case cartActions.REMOVE_FROM_CART: {
//             newState = {
//                 ...state,
//                 items: state.items.filter(item => item.id !== action.payload)
//             };
//             break;
//         }

//         case cartActions.UPDATE_QUANTITY: {
//             const updatedItems = state.items.map(item =>
//                 item.id === action.payload.id
//                     ? { ...item, quantity: Math.max(0, action.payload.quantity) }
//                     : item
//             ).filter(item => item.quantity > 0);

//             newState = {
//                 ...state,
//                 items: updatedItems
//             };
//             break;
//         }

//         case cartActions.CLEAR_CART: {
//             newState = {
//                 ...state,
//                 items: []
//             };
//             break;
//         }

//         case cartActions.TOGGLE_CART: {
//             return {
//                 ...state,
//                 isOpen: !state.isOpen
//             };
//         }

//         case cartActions.CALCULATE_TOTAL: {
//             const total = state.items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
//             const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
            
//             return {
//                 ...state,
//                 total,
//                 itemCount
//             };
//         }

//         default:
//             return state;
//     }

//     // Calculate totals for all state changes except TOGGLE_CART and CALCULATE_TOTAL
//     if (newState) {
//         const total = newState.items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
//         const itemCount = newState.items.reduce((sum, item) => sum + item.quantity, 0);
        
//         return {
//             ...newState,
//             total,
//             itemCount
//         };
//     }

//     return state;
// }

// // Cart Provider Component
// export function CartProvider({ children }) {
//     const [state, dispatch] = useReducer(cartReducer, initialState);
//     const [isInitialized, setIsInitialized] = useState(false);

//     // Load cart from localStorage on mount
//     useEffect(() => {
//         try {
//             const savedCart = localStorage.getItem('classKart_cart');
//             if (savedCart) {
//                 const cartData = JSON.parse(savedCart);
//                 if (cartData && cartData.items && Array.isArray(cartData.items)) {
//                     cartData.items.forEach(item => {
//                         dispatch({ type: cartActions.ADD_TO_CART, payload: item });
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error('Error loading cart from localStorage:', error);
//             localStorage.removeItem('classKart_cart');
//         } finally {
//             setIsInitialized(true);
//         }
//     }, []);

//     // Save cart to localStorage whenever it changes (but only after initialization)
//     useEffect(() => {
//         if (isInitialized) {
//             try {
//                 localStorage.setItem('classKart_cart', JSON.stringify({
//                     items: state.items,
//                     total: state.total,
//                     itemCount: state.itemCount
//                 }));
//             } catch (error) {
//                 console.error('Error saving cart to localStorage:', error);
//             }
//         }
//     }, [state.items, state.total, state.itemCount, isInitialized]);

//     const addToCart = (item) => {
//         dispatch({ type: cartActions.ADD_TO_CART, payload: item });
//     };

//     const removeFromCart = (itemId) => {
//         dispatch({ type: cartActions.REMOVE_FROM_CART, payload: itemId });
//     };

//     const updateQuantity = (itemId, quantity) => {
//         dispatch({ type: cartActions.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
//     };

//     const clearCart = () => {
//         dispatch({ type: cartActions.CLEAR_CART });
//     };

//     const toggleCart = () => {
//         dispatch({ type: cartActions.TOGGLE_CART });
//     };

//     const value = {
//         ...state,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         toggleCart,
//         isInitialized
//     };

//     // Don't render children until cart is initialized
//     if (!isInitialized) {
//         return null; // or a loading spinner
//     }

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// // Custom hook to use cart context
// export function useCart() {
//     const context = useContext(CartContext);
//     if (context === undefined) {
//         throw new Error('useCart must be used within a CartProvider. Make sure your component is wrapped with <CartProvider>.');
//     }
//     return context;
// }

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
