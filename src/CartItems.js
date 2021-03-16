import React from 'react';
import { CartItem } from './CartItem';


export const CartItems = ({listOfItems, totalPrice}) => {
    return (
        <div className="container">
            <h1>Cart Items</h1>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-md-8">Product</div>
                        <div className="col-md-2">Price</div>
                        <div className="col-md-2">Quantity</div>
                    </div>
                </div>
                {listOfItems.map( (item) => <CartItem item={item} />)}
            </div>
            <div>Total Price: ${totalPrice}</div>
        </div>
    )
}