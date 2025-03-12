import React, { useEffect, useState } from "react";
import img from "../../../public/images/asa.jpg";
import { useSelector } from "react-redux";
import { selectBasket } from "../../features/basket/basketSlice";
import Product from "./Product";
import { TbZoomExclamation } from "react-icons/tb";

const Products = () => {

  const products = useSelector(selectBasket);
  console.log();
  
  return (
    <div className="divide-y min-h-72 flex">
      {
        products.length > 0 ? <div className="w-full">{products?.map((product, index) => (<Product data={product}/>))}</div>
        : <h1 className="text-3xl font-bold text-center m-auto">There is nothing in the cart</h1>  
      }
    </div>
  );
};

export default Products;