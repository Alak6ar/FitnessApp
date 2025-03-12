import React, { useState } from "react";
import img from "../../../public/images/asa.jpg";
import Product from "./Product";
import { useProductsQuery } from "../../services/productApi";

const Index = () => {
  const { data, isLoading, isFetching } = useProductsQuery();
  console.log([data]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" id="products">
      <div className="flex items-center w-full">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mr-5">PRODUCTS</h2>
        <div className="bg-orange-500 h-0.5 w-9/12"></div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 mt-8">
        {isLoading || isFetching
          ? "Loading..."
          : data.map((product, i) => (
              <Product product={product} key={i}/>
            ))}
      </div>
    </div>
  );
};

export default Index;
