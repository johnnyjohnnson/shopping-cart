import React from 'react';


class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            quantity: 0
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onsubmit(this.state.product, this.state.quantity);
    }

    onChangeHandler = (e) => {
        let curProd = this.props.products.filter( prod => prod.id == e.target.value)
        if (curProd.length === 1) {
            curProd = curProd[0];
        } else {
            curProd = {};
        }
        this.setState({product: curProd});
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <div>
                    Quantity
                </div>
                <div>
                    <input type="number" onChange={e => this.setState({quantity: e.target.value})}></input>
                </div>
                <div>
                    Products
                </div>
                <div>
                    <select onChange={this.onChangeHandler}>
                        {this.props.products.map(
                            (prod, index) => <option key={index} value={prod.id}>{prod.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        );
    };
}


export default AddItem;