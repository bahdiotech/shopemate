import { useState,useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export const ProductCard = ({product}) => {
  const { addToCart, cartList, removeFromCart } = useCart()
  const [isInCart, setIsIncart] = useState(true)

  const {id, name, price, image} = product;
  useEffect(() => {
    const productIsInCard = cartList.find(cartItem => cartItem.id === id)
    if (productIsInCard){
      setIsIncart(true)
    } else {
      setIsIncart(false)
    }
  }, [cartList, id]);

  const handleAdd = () => {
    addToCart(product);
    console.log(cartList)
  }

  const handleRemove = () => {
    removeFromCart(product)
  }

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        { !isInCart ? 
        <button onClick={handleAdd}>Add To Cart</button>
  : <button className="remove" onClick={handleRemove}>Remove</button>}
      </div>
    </div>
  )
}
