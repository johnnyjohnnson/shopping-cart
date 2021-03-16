import './App.css';
import { CartHeader } from './CartHeader';
import { CartFooter } from './CartFooter';
import AddItem from './AddItem';
import { CartItems} from './CartItems';
import React from 'react';

class App extends React.Component {
  
  constructor() {
    super();

    this.state = {

      cartItemsList: [
        { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
        { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
        { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
      ],
      products: [
        { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 },
        { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 },
        { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 },
        { id: 43, name: 'Small Aluminum Keyboard', priceInCents: 2500 },
        { id: 44, name: 'Practical Copper Plate', priceInCents: 1000 },
        { id: 45, name: 'Awesome Bronze Pants', priceInCents: 399 },
        { id: 46, name: 'Intelligent Leather Clock', priceInCents: 2999 },
        { id: 47, name: 'Ergonomic Bronze Lamp', priceInCents: 40000 },
        { id: 48, name: 'Awesome Leather Shoes', priceInCents: 3990 },
      ]
    };

  }
  
  submitForm = (product, quantity) => {
    let itemToAdd = Object.assign(
      {}, {id: this.state.cartItemsList.length + 1, product, quantity}
    )
    this.setState( {cartItemsList: this.state.cartItemsList.concat(itemToAdd)} );
  }

  render() {

    const totalPrice = this.state.cartItemsList.reduce((acc, curVal) => {
      return acc + curVal.quantity * curVal.product.priceInCents
    }, 0) / 100;
    
    return (
      <div className="App">
        <CartHeader />
        <CartItems listOfItems={this.state.cartItemsList} totalPrice={totalPrice}/>
        <AddItem products={this.state.products} onsubmit={this.submitForm} />
        <CartFooter copyright="2021"/>
      </div>
    );
  }
}

export default App;
