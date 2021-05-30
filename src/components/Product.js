import React from "react";
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import parsingPrice from "./number";
export default class Product extends React.Component {
  
    render(){
        return(
            <div>
               <ul className="products">
                
               
                {this.props.products.map(product => (
                    <div className="product" key={product._id}>
                    <Card key={product._id} className="h-100">
                        
                        <CardBody className="cardBodyProducts">
                        <CardTitle tag="h1">{product.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{product.category}</CardSubtitle>
                        <CardText tag="h3">{product.description}</CardText>
                        <div className="footer-product">
                        <Button onClick={()=>this.props.addToCart(product)}color="warning">Add to cart</Button>{' '}
                        <CardText>{parsingPrice(product.price)}</CardText>
                        </div>
                        
                        </CardBody>
                    </Card>
                    </div>
              
                ))}
               </ul>
            </div>
        );

        
    }
}



