import React, { useEffect, useReducer, createContext } from 'react';
import axios from 'axios';
import reducer from './reducer';

const AppContext = createContext();

const defaultState = {
    cart: [],
    total: 0,
    amount: 0,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const fetchData = async () => {
        const url = 'https://course-api.com/react-useReducer-cart-project';
        try {
            const response = await axios.get(url);
            if (response.status >= 400) {
                throw new Error(response.statusText);
            }
            const data = response.data;
            dispatch({ type: 'FETCH_ITEMS', payload: data });
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const increase = (id) => {
        dispatch({ type: 'INCREASE', payload: id });
    };

    const decrease = (id) => {
        dispatch({ type: 'DECREASE', payload: id });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        dispatch({ type: 'GET_TOTALS' });
    }, [state.cart]);

    return (
        <AppContext.Provider
            value={{
                state,
                clearCart,
                removeItem,
                increase,
                decrease,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
