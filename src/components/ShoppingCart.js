import React, { Component } from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, FormGroup, Label, Input, Col
  } from 'reactstrap';
import parsingPrice from "./number";

export default class ShoppingCart extends Component {
    
    render() {
        const {carts} = this.props;
        return (
            <div className="m-4">
                <h1>Shopping Cart</h1>
                {carts.length === 0?
                <div className="cart cart-title">There are not selected products </div>    
                 :
                 <div className="cart cart-title">There are {carts.length} selected products </div>
                 }
            
            <div className="carts">
                <div className="cart-components">

                {carts.map(cartItem => (
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
            {carts.length !== 0 && 
            (
                <div className="total m-4">
                <div>
                   Total: {parsingPrice(carts.reduce((accumulator,item)=> accumulator + item.price * item.count, 0 ))}
                </div>
            </div>
            )} 
           
            </div>
            
        )
    }
}
