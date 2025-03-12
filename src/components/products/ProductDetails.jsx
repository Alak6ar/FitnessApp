import React from "react";
import startImg from "../../../public/images/star.svg";
import startOImg from "../../../public/images/star-o.svg";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Header from "../Header";
import Footer from "../Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useAddCartMutation, useProductQuery } from "../../services/productApi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBasket, removeBasket, selectBasket } from "../../features/basket/basketSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductQuery(id);
  const dispatch = useDispatch();

  const basket = useSelector(selectBasket);
  const basketProduct = basket.find(item => item.id === data?.id)

  const [addCart] = useAddCartMutation();

  console.log(basket);
  

  const addBasketHandler = async () => {
    // const token = localStorage.getItem("token") || null;
    // if (token) {
    //   console.log(token);
    //   const quantity = {quantity: 2}
    //   const res  = await addCart({id, quantity, token}).unwrap();

    //   console.log(res);
    // }
  
    dispatch(addBasket({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      discount: data.discount,
      discountPrice: data.discountPrice,
      imageUrl: data.imageUrl,
      amount: 1
    }))
  }

  const removeBasketHandler = () => {
    dispatch(removeBasket({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      discount: data.discount,
      discountPrice: data.discountPrice,
      imageUrl: data.imageUrl,
    }))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-black mb-12">
        <Header />
      </div>
      <div className="container">
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="flex">
            <div className="mr-8">
              <Carousel showIndicators={true} thumbWidth={100} width={600}>
                {data?.productImages?.map((img, index) => (
                  <div>
                    <img src={img.imageUrl} key={index}/>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="mt-5 max-w-md">
              <h1 className="text-2xl mb-4 font-semibold">{data?.name}</h1>
              <div className="flex justify-between items-center">
                <div className="mb-2 flex gap-1 relative">
                  <div className="flex gap-1 absolute left-0">
                    <img src={startOImg} alt="" className="opacity-6" />
                    <img src={startOImg} alt="" className="opacity-6" />
                    <img src={startOImg} alt="" className="opacity-6" />
                    <img src={startOImg} alt="" className="opacity-6" />
                    <img src={startOImg} alt="" className="opacity-6" />
                  </div>
                  {Array(data?.rate)
                    .fill(1)
                    .map((o, index) => (
                      <img src={startImg} alt="" key={index} className="opacity-6 relative z-1" />
                    ))}
                </div>
                <div className="flex">
                  <div className="text-green-400 mr-2">In stock:</div>
                  <div className="text-gray-800">({data?.stockQuantity})</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-xl mr-2 font-semibold">${(data?.discountPrice).toFixed(2)}</div>
                <div className="text-base text-gray-600 relative">
                  ${(data?.price).toFixed(2)}
                  <span className="absolute inset-0 my-auto h-px bg-gray-600"></span>
                </div>
              </div>
              <p className="text-base text-gray-800 mt-2">{data?.description}</p>
              <div className="w-full h-px bg-gray-300 my-6"></div>

              <div className="flex items-center">
                <div className="mr-2 font-medium">Colours:</div>
                <div className="flex gap-2">
                  {data?.color ? <div className="size-4 rounded-full ring-2 ring-black ring-offset-1" style={{ backgroundColor: data?.color }}></div>
                  : <div>Not color</div>}
                </div>
              </div>

              <div className="flex items-center my-6">
                <div className="mr-4 border rounded-md flex items-center overflow-hidden">
                  <button type="button" onClick={removeBasketHandler} disabled={!basketProduct} className="bg-white px-3 h-10 text-black rounded-md ">
                    <FaMinus />
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center text-center border-l border-r">
                    {
                      basketProduct && basketProduct.amount || 0
                    }</div>
                  <button type="button" onClick={addBasketHandler} className="bg-orange-600 px-3 h-10 text-white">
                    <FaPlus />
                  </button>
                </div>
                <div>
                  <Link className="bg-orange-600 text-white w-36 h-10 flex justify-center items-center rounded-md inline-block" to="/shopping-cart">
                    Buy Now
                  </Link>
                </div>
              </div>

              <div className="flex gap-2">
                {data?.tagNames.map((tagName, index) => (
                  <span key={index} className="border text-white bg-slate-800 rounded-full px-4 p-1 text-xs">
                    {tagName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetails;
