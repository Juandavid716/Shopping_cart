import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, FormGroup, Label, Input, Col, Form, Button
  } from 'reactstrap';
import { removeFromCart, updateCart } from '../actions/cartActions';
import {createOrder, clearOrder} from "../actions/orderActions";
import { Redirect } from "react-router-dom";
import parsingPrice from "./number";
import {Link} from "react-router-dom";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            number: "",
            ID: "",
            total: ""
        }
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    range(start, stop, step) {
        var a = [start], b = start;
        while (b < stop) {
            a.push(b += step || 1);
        }
        return a;
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            number: this.state.number,
            ID_user: this.state.ID,
            total: this.props.cartItems.reduce((accumulator,item)=> accumulator + item.price * item.count, 0 )
        };
        this.props.createOrder(order);
        this.setState({
            name: "",
            email: "",
            address: "",
            number: "",
            ID: "",
            total: ""
        })
        
        
    }
    render() {
        const {cartItems, order} = this.props;
        return (
            <div className="m-4">
                <h1 className="m-4">Shopping Cart</h1>
                {cartItems.length === 0 && 
                <div className="cart cart-title">There are not selected products </div>    
                 
                 
                 }
                 {
                     order && 
                  
                     <Redirect
                        to={{
                            pathname: "/order",
                            search: "",
                            state: { detail: order }
                        }}
                        />
                   
                   
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
                        <Input onChange={this.props.updateCart(cartItem)}type="select" name="select" id="exampleSelect" value={cartItem.count}>
                        { this.range(1, 100,1).map(value => <option key={value} value={value}>{value}</option>) }
                            
                        </Input>
                        </Col>
                    </FormGroup>
                    <div onClick={()=> this.props.removeFromCart(cartItem)} >
                    <img alt="removeLogo" className="imageRemove"src="https://img.icons8.com/plasticine/64/000000/filled-trash.png"/>
                    </div>
                 </div>
                <div className="price">{parsingPrice(cartItem.price * cartItem.count)}</div>
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
                        <Label for="address" sm={2}>Address</Label>
                        <Col sm={10}>
                        <Input type="text" 
                        name="address" 
                        id="address" 
                        placeholder="1234 Main St" required
                        onChange={this.handleInput}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="number" sm={2}>Phone Number</Label>
                        <Col sm={10}>
                        <Input
                        type="number"
                        name="number"
                        id="number"
                        placeholder="number placeholder"
                        onChange={this.handleInput}
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={2} required >Email</Label>
                        <Col>
                        <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="with a placeholder"
                        onChange={this.handleInput}
                        />
                        </Col>
                    </FormGroup>
                    </div>
                    <div className="orderButton"> 
                        <Button type="submit" className="m-4">Place order</Button>
                        <Link id="linkToHome" to="/">
                        <div id="backMainPage"><p>Back to List </p></div>   
                        </Link>
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
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart, createOrder, clearOrder,updateCart }
  )(ShoppingCart);