import React, { useEffect, useState } from "react";
import remove_ic from "../../../public/images/times-ic.svg";
import pen_ic from "../../../public/images/pen-ic.svg";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addBasket, removeBasket, removeItemBasket, selectBasket } from "../../features/basket/basketSlice";

const Product = ({ data }) => {
  console.log(data);

  const { id, imageUrl, name, description, price, discountPrice, discount, amount } = data;

  const [totalPrice, setTotalPrice] = useState((discountPrice * amount).toFixed(2));

  useEffect(() => {
    setTotalPrice((discountPrice * amount).toFixed(2));
  }, [amount]);

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();

  const basketProduct = basket.find((item) => item.id === id);

  const addBasketHandler = () => {
    dispatch(
      addBasket({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        discount: data.discount,
        discountPrice: data.discountPrice,
        imageUrl: data.imageUrl,
        amount: amount,
      })
    );
  };

  const removeBasketHandler = () => {
    dispatch(
      removeBasket({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        discount: data.discount,
        discountPrice: data.discountPrice,
        imageUrl: data.imageUrl,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(removeItemBasket({
      id: data.id
    }))
  }

  return (
    <div className="flex items-center py-6 w-full">
      <div className="mr-10">
        <img src={imageUrl} alt="" className="size-32 min-w-32 object-cover drop-shadow-lg" />
      </div>
      <div className="flex justify-between w-full">
        <div className="max-w-56">
          <Link to={`/product/${id}`} className="text-base font-normal text-black font-semibold ">
            {name}
          </Link>
          <p className="text-base text-gray-600 line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="">
            <div className="font-bold text-base">${discountPrice.toFixed(2)}</div>
            <div className="text-base text-gray-600 relative">
              ${price.toFixed(2)}
              <div className="bg-gray-600 w-full h-px absolute inset-0 my-auto"></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-14 h-14 mr-0.5 rounded-md flex items-center justify-center border ">{(basketProduct && basketProduct.amount) || 0}</div>
            <div className="flex gap-0.5 flex-col justify-center">
              <button type="button" onClick={addBasketHandler} className="h-7 w-10 rounded-md bg-orange-600 text-white flex justify-center items-center">
                <FaPlus />
              </button>
              <button type="button" onClick={removeBasketHandler} disabled={!basketProduct} className="h-7 w-10 border rounded-md text-black flex justify-center items-center">
                <FaMinus />
              </button>
            </div>
          </div>
          <div className="font-bold text-base">${totalPrice}</div>
          <div className="flex flex-col pl-10">
            <button type="button" className="mb-2" onClick={removeItemHandler}>
              <img src={remove_ic} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
