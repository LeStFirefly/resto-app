import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart, decCount, incCount} from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, deleteFromCart, decCount, incCount, RestoService}) => {
    if (items.length === 0) {
        return(
            <div className="cart__title">Ваша корзина пуста</div>
        )
    }

    const cartItems = items.map(item => {
        const {title,price,url,id,count} = item;
        return(
            <div key={id} className="cart__item">
                <div className="cart__info-block">
                    <img src={url} className="cart__item-img" alt={title}></img>
                    <div className="cart__item-title">{title}</div>
                </div>
                <div className="cart__price-block">
                    <div className="cart__item-price">{price}$</div>
                    <div className="cart__counter" onClick={() => decCount(item)}>-</div>
                    <div className="cart__item-count">{count}</div>
                    <div className="cart__counter" onClick={() => incCount(item)}>+</div>
                    <div className="cart__item-total-price">Total: {price*count}$</div>
                </div> 
                <div className="cart__close" onClick={() => deleteFromCart(id)}>&times;</div>
            </div>
        )
    })

    return (
        <div className="cart__container">
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {cartItems}
            </div>
            <button className="cart__btn" onClick={() => {
                RestoService.setOrder(generateOrder(items));
                console.log('click');
                document.getElementsByClassName('thanks')[0].style.opacity = 1;
                setTimeout( () => document.getElementsByClassName('thanks')[0].style.opacity = 0, 3000);
                document.getElementsByClassName('cart__btn')[0].disabled = 'true';
                document.getElementsByClassName('cart__btn')[0].innerText = 'Заказ оформлен';
            }
            }>Оформить заказ</button>
            <span className='thanks'>Спасибо за заказ!</span>
        </div>
    );
};

const generateOrder = (items) => {
    const order = items.map( item => {
        return {
            id: item.id,
            count: item.count
        }
    });
    return order;
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    incCount,
    decCount
}

export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(CartTable));