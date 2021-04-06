import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://course-api.com/react-useReducer-cart-project';
            try {
                const response = await axios.get(url);
                if (response.status >= 400) {
                    throw new Error(response.statusText);
                }
                const data = response.data;
                setData(data);
                setTotalAmount(data.length);
                let total = 0;
                data.forEach((item) => {
                    const p = parseFloat(item.price);
                    return (total = total + p);
                });
                setTotalPrice(total);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const clearCart = () => {
        setData([]);
        setTotalAmount(0);
    };

    const incrementItem = (id) => {
        const item = data.find((item) => item.id === id);
        console.log(item);
        console.log('increment', id);
    };

    const decrementItem = (id) => {
        console.log('decrement', id);
    };
    return (
        <AppContext.Provider
            value={{
                data,
                totalAmount,
                totalPrice,
                clearCart,
                incrementItem,
                decrementItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider };
export { AppContext };
