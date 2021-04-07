const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ITEMS':
            return { ...state, cart: action.payload };
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        case 'REMOVE_ITEM':
            const newCart = state.cart.filter(
                (item) => item.id !== action.payload
            );
            return { ...state, cart: newCart };
        case 'INCREASE':
            const newCartInc = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
            return { ...state, cart: newCartInc };
        case 'DECREASE':
            const newCartDec = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            });
            return { ...state, cart: newCartDec };
        case 'GET_TOTALS':
            let { total, amount } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, amount } = cartItem;
                    const itemTotal = price * amount;
                    cartTotal.total += itemTotal;
                    cartTotal.amount += amount;
                    return cartTotal;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            return { ...state, total, amount };
        default:
            throw new Error('No action type found');
    }
};

export default reducer;
