import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

// Function to save the state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

// Function to load the state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined; // Let Redux initialize the state
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};

// Load the persisted state
const persistedState = loadState();

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: {
        cart: persistedState
    },
});
// Subscribe to store changes to persist state
store.subscribe(() => {
    saveState(store.getState().cart);
});

// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cartSlice";

// // Function to save the state to localStorage
// const saveState = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('cartState', serializedState);
//     } catch (e) {
//         console.error("Could not save state", e);
//     }
// };

// // Function to load the state from localStorage
// const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('cartState');
//         if (serializedState === null) {
//             return undefined; // Let Redux initialize the state
//         }
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.error("Could not load state", e);
//         return undefined;
//     }
// };

// // Load the persisted state
// const persistedState = loadState();

// // Ensure the loaded state matches the reducer key
// const preloadedState = {
//     cart: persistedState
// };

// export const store = configureStore({
//     reducer: {
//         cart: cartReducer,
//     },
//     preloadedState,
// });

// // Subscribe to store changes to persist state
// store.subscribe(() => {
//     saveState(store.getState().cart);
// });





// // store.js
// // import { configureStore } from "@reduxjs/toolkit";
// // import CartSlice from "../features/cartSlice";

// // // Function to save the state to localStorage
// // const saveState = (state) => {
// //     try {
// //         const serializedState = JSON.stringify(state);
// //         localStorage.setItem('cartState', serializedState);
// //     } catch (e) {
// //         console.error("Could not save state", e);
// //     }
// // };

// // // Function to load the state from localStorage
// // const loadState = () => {
// //     try {
// //         const serializedState = localStorage.getItem('cartState');
// //         if (serializedState === null) {
// //             return undefined; // Let Redux initialize the state
// //         }
// //         return JSON.parse(serializedState);
// //     } catch (e) {
// //         console.error("Could not load state", e);
// //         return undefined;
// //     }
// // };

// // // Load the persisted state
// // const persistedState = loadState();

// // export const store = configureStore({
// //     reducer: {
// //         allCart: CartSlice,
// //     },
// //     preloadedState: {
// //         allCart: persistedState
// //     }
// // });

// // // Subscribe to store changes to persist state
// // store.subscribe(() => {
// //     saveState(store.getState().allCart);
// // });
