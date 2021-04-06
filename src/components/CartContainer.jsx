import React, { useContext } from 'react';
import CartItem from './CartItem';
import { AppContext } from './context';

const CartContainer = () => {
    const { data, totalPrice, clearCart } = useContext(AppContext);
    return (
        <section className='cart'>
            <header>
                <h2>your bag</h2>
                {data.length === 0 && (
                    <h4 className='empty-cart'>is currently empty</h4>
                )}
            </header>
            <div>
                {data
                    ? data.map((item) => {
                          return <CartItem key={item.id} item={item} />;
                      })
                    : null}
            </div>
            {data.length > 1 && (
                <footer>
                    <hr />
                    <div className='cart-total'>
                        <h4>
                            total <span>${`${totalPrice}`}</span>
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
