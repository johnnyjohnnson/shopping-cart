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
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async addItemToCart (product, quantity) {
    let itemToAddServer = {product_id: product.id, quantity, id: this.state.cartItemsList.length + 1};
    const responsePost = await fetch(
      "http://localhost:8082/api/items",
      {
        method: "POST",
        body: JSON.stringify(itemToAddServer),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    await responsePost.json();

    // notfalls drauf adden...
    let addedToCartItems = false;
    let copyOfCartItemsList = this.state.cartItemsList;
    copyOfCartItemsList.forEach( item => {
      if (item.product.id == product.id) {
        Object.assign(item, {quantity: parseInt(item.quantity) + parseInt(quantity)})
        addedToCartItems = true;
      }
    })
    if (!addedToCartItems) {
      const itemToAddState = Object.assign(
        {}, {id: this.state.cartItemsList.length + 1, product, quantity}
      )
      copyOfCartItemsList = this.state.cartItemsList.concat(itemToAddState);
    }
    const totalPrice = this.calculateTotalPrice(copyOfCartItemsList);
    this.setState( {cartItemsList: copyOfCartItemsList, totalPrice} );
  }

  calculateTotalPrice = ( cartItems ) => {
    return cartItems.reduce((acc, curVal) => {
      return acc + curVal.quantity * curVal.product.priceInCents
    }, 0) / 100;
  }

  async componentDidMount() {
    // get cart items
    const respCartItems = await fetch("http://localhost:8082/api/items");
    const respCartItemsJson = await respCartItems.json();
    // get products
    const respProducts = await fetch("http://localhost:8082/api/products");
    const respProdJson = await respProducts.json();
    // join cart items with products on id
    respCartItemsJson.forEach( item => {
      let prodToJoinWith = respProdJson.filter( prod => prod.id === item.product_id)[0];
      Object.assign(item, { product: prodToJoinWith})
    })
    // calculate total price
    const totalPrice = this.calculateTotalPrice(respCartItemsJson);
    // update state
    this.setState({cartItemsList: respCartItemsJson, products: respProdJson, totalPrice});
  }

  render() {

    return (
      <div className="App">
        <CartHeader />
        <CartItems listOfItems={this.state.cartItemsList} totalPrice={this.state.totalPrice}/>
        <AddItem products={this.state.products} onsubmit={this.addItemToCart} />
        <CartFooter copyright="2021"/>
      </div>
    );
  }
}

export default App;
