import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket, addBasket } from "../../features/basket/basketSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="group relative ring-2 ring-orange-600 rounded-md overflow-hidden">
      <img src={product.imageUrl} alt="" className="w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
      <div className="flex justify-between bg-gray-100 py-3.5 px-5">
        <div>
          <h3 className="text-base text-black font-semibold">
            <Link to={`product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <div className="mt-2 flex justify-between">
            <span className="text-lg font-semibold">${product.discountPrice.toFixed(2)}</span>
            <div className="text-base text-gray-700 relative">
              ${product.price.toFixed(2)}
              <span className="h-px w-full bg-gray-700 absolute inset-0 my-auto"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
