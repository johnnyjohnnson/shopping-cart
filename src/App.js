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
      cartItemsList: [],
      products: [],
      totalPrice: 0
    };
  }
  
  submitForm = (product, quantity) => {
    let itemToAdd = Object.assign(
      {}, {id: this.state.cartItemsList.length + 1, product, quantity}
    )
    this.setState( {cartItemsList: this.state.cartItemsList.concat(itemToAdd)} );
  }

  async componentDidMount() {
    // get cart items
    const respCartItems = await fetch("http://localhost:8082/api/items");
    const respCartItemsJson = await respCartItems.json();
    // get products
    const respProducts = await fetch("http://localhost:8082/api/products");
    const respProdJson = await respProducts.json();
    // join cart items with products on id
    respCartItemsJson.map( item => {
      let prodToJoinWith = respProdJson.filter( prod => prod.id === item.product_id)[0];
      Object.assign(item, { product: prodToJoinWith})
    })
    // calculate total price
    const totalPrice = respCartItemsJson.reduce((acc, curVal) => {
      return acc + curVal.quantity * curVal.product.priceInCents
    }, 0) / 100;
    console.log(respCartItemsJson);
    // update state
    this.setState({cartItemsList: respCartItemsJson, products: respProdJson, totalPrice});
  }

  render() {

    return (
      <div className="App">
        <CartHeader />
        <CartItems listOfItems={this.state.cartItemsList} totalPrice={this.state.totalPrice}/>
        <AddItem products={this.state.products} onsubmit={this.submitForm} />
        <CartFooter copyright="2021"/>
      </div>
    );
  }
}

export default App;
