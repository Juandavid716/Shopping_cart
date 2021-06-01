import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, FormGroup, Label, Input, Col, Form, Button
  } from 'reactstrap';
import { removeFromCart } from '../actions/cartActions';
import parsingPrice from "./number";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            phoneNumber: "",
            ID: ""
        }
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            ID: this.state.ID,
            cartItems: this.props.cartItems
        };
        this.props.createOrder(order);
    }
    render() {
        const {cartItems} = this.props;
        return (
            <div className="m-4">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0?
                <div className="cart cart-title">There are not selected products </div>    
                 :
                 <div className="cart cart-title">There are {cartItems.length} selected products </div>
                 }
            
            <div className="carts">
                <div className="cart-components">

                {cartItems.map(cartItem => (
                <div key={cartItem._id} className="m-4">
                <Card key={cartItem._id}  >
                        
                <CardBody className="cartBody" >
                <div className="cardHeaderFather">
                <div className="cardHeader">
                    <CardTitle tag="h1">{cartItem.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{cartItem.category}</CardSubtitle>
                </div>
                </div>
                <div className="cardOptionsFather">

               
                <div className="cardOptions">
                 <div className="unitPrice">
                     <p className="m-0">Unit Price</p>
                     <CardText> {parsingPrice(cartItem.price)}</CardText>
                 </div>
                 <div className="addRemove">
                    <FormGroup row>
                        <Label for="exampleSelect" >Qty</Label>
                        <Col sm={10}>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                        </Col>
                    </FormGroup>
                    <div onClick={()=> this.props.removeFromCart(cartItem)} >
                    <img alt="removeLogo" className="imageRemove"src="https://img.icons8.com/plasticine/64/000000/filled-trash.png"/>
                    </div>
                 </div>
                <div className="price">{parsingPrice(cartItem.price)}</div>
                </div>
                </div>
                </CardBody>
                </Card>
                </div>
                ))}
                </div>

            </div>
            {cartItems.length !== 0 && 
            (
                <div>
                <div className="total m-4">
                <div>
                   Total: {parsingPrice(cartItems.reduce((accumulator,item)=> accumulator + item.price * item.count, 0 ))}
                </div>
                </div>
                <div className="m-4">Ready to Order?</div>
                
                
                <Form onSubmit={this.createOrder}>
                <div className="orderSection m-4"> 
                <h2 id="titleForm">Customer Information</h2>
                    <FormGroup row>
                        <Label for="name" sm={2}>Full Name*</Label>
                        <Col sm={10}>
                        <Input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="with a placeholder" required
                        onChange={this.handleInput}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="ID" sm={2}>ID*</Label>
                        <Col sm={10}>
                        <Input type="text" 
                        name="ID" 
                        id="ID" 
                        placeholder="with a placeholder" required 
                        onChange={this.handleInput}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Address" sm={2}>Address</Label>
                        <Col sm={10}>
                        <Input type="text" 
                        name="Address" 
                        id="Address" 
                        placeholder="1234 Main St" required
                        onChange={this.handleInput}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleNumber" sm={2}>Phone Number</Label>
                        <Col sm={10}>
                        <Input
                        type="number"
                        name="number"
                        id="exampleNumber"
                        placeholder="number placeholder"
                        onChange={this.handleInput}
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2} required >Email</Label>
                        <Col>
                        <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="with a placeholder"
                        onChange={this.handleInput}
                        />
                        </Col>
                    </FormGroup>
                    </div>
                    <div className="orderButton"> 
                        <Button type="submit" className="m-4 ">Place order</Button>
                        <div id="backMainPage"><p>Back to List </p></div>   
                    </div>
                    </Form>
            
                
                
                
                </div>
            )} 
           
            </div>
            
        )
    }
}

export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart }
  )(ShoppingCart);