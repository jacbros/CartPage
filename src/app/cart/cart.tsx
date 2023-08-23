"use client";

import React, { useState, useEffect } from "react";
import { Select } from "@/components/select"; // Adjust the path as needed
import productsData from "@/responses/products.json"; // Adjust the path as needed
import { IProduct } from "@/types/types"; // Adjust the path as needed

export interface ICartPageProps {}

export function CartPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setProducts(productsData.products);
  }, []);

  const addToCart = (product: IProduct) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) => item.productKey === product.productKey
    );

    if (existingProduct) {
      if (existingProduct.quantity < 10) {
        existingProduct.quantity++;
      }
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const removeFromCart = (productKey: string) => {
    const updatedCart = cart.filter((item) => item.productKey !== productKey);

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (updatedCart: IProduct[]) => {
    const newTotalPrice = updatedCart.reduce(
      (total, item) =>
        total + (item.price.value.centAmount * item.quantity) / 100,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  const updateQuantity = (productKey: string, newQuantity: number) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 10) {
      //Only max 10, as outlined in the assignment
      newQuantity = 10;
    }

    const updatedCart = cart.map((item) =>
      item.productKey === productKey ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  return (
    <div>
      <h1>Welcome to the Cart!</h1>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productKey}>
            <p>{product.name}</p>
            <p>Price: {product.price.value.centAmount / 100} EUR</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map((cartProduct) => (
          <li key={cartProduct.productKey}>
            <p>{cartProduct.name}</p>
            <p>Price: {cartProduct.price.value.centAmount / 100} EUR</p>
            <label>Quantity:</label>
            <select
              value={cartProduct.quantity}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                updateQuantity(
                  cartProduct.productKey,
                  parseInt(event.target.value)
                )
              }
              style={{ marginLeft: "10px" }}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button onClick={() => removeFromCart(cartProduct.productKey)}>
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>
      <p>Total Price: {totalPrice} EUR</p>
    </div>
  );
}
