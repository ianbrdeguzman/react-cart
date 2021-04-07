import React, { useContext } from 'react';
import CartItem from './CartItem';
import { AppContext } from './context';

const CartContainer = () => {
    const { state, clearCart } = useContext(AppContext);

    return (
        <section className='cart'>
            <header>
                <h2>your bag</h2>
                {state.amount === 0 && (
                    <h4 className='empty-cart'>is currently empty</h4>
                )}
            </header>
            <div>
                {state.cart
                    ? state.cart.map((item) => {
                          return <CartItem key={item.id} {...item} />;
                      })
                    : null}
            </div>
            {state.amount > 0 && (
                <footer>
                    <hr />
                    <div className='cart-total'>
                        <h4>
                            total <span>${`${state.total}`}</span>
                        </h4>
                    </div>
                    <button onClick={clearCart} className='btn clear-btn'>
                        clear cart
                    </button>
                </footer>
            )}
        </section>
    );
};

export default CartContainer;
