import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import parsingPrice from "./number";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

export default function Product() {
  const dispatch = useDispatch();
  const items = useSelector((state) => {
    return state.products.items;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClick = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      {!items ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            {!items ? (
              <div>Loading...</div>
            ) : (
              <ul className="products">
                {items.map((product) => (
                  <div className="product" key={product._id}>
                    <Card key={product._id} className="h-100">
                      <CardBody className="cardBodyProducts">
                        <CardTitle tag="h1">{product.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          {product.category}
                        </CardSubtitle>
                        <CardText tag="h3">{product.description}</CardText>
                        <div className="footer-product">
                          <Button
                            onClick={() => handleClick(product)}
                            color="warning"
                          >
                            Add to cart
                          </Button>{" "}
                          <CardText>{parsingPrice(product.price)}</CardText>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
