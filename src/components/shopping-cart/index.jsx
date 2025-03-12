import React, { use, useEffect, useRef, useState } from "react";
import Header from "../Header";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, selectBasket } from "../../features/basket/basketSlice";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../ui/InputField";
import { useApplyPromoCodeMutation } from "../../services/productApi";
import { MdDeleteOutline } from "react-icons/md";
import { addCost } from "../../features/basket/totalAmountSlice";


const Index = () => {
  const products = useSelector(selectBasket);
  const [cost, setCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [couponCode, setCouponCode] = useState(0);
  const [couponMessage, setCouponMessage] = useState("")
  const navigate = useNavigate();
  const promoInp = useRef();
  const dispatch = useDispatch();

  const [applyPromoCode, { isLoading }] = useApplyPromoCodeMutation();

  const checkoutHandler = () => {
    navigate('/checkout')
    dispatch(addCost(cost))
  }

  const promoCodeConfirm = async () => {
    if (promoCode.length > 2) {
      try {
        const res = await applyPromoCode({ couponCode: promoCode }).unwrap();
        if (!res) throw new Error("Error");
        setCouponMessage('Promo applied successfully');
        setCouponCode(res.finalAmount)
      } catch (err) {
        console.log(err);
        if (err.status == 404) {
          setCouponMessage(err.data.Message);
        }
      }
    }
  }

  const removeCouponCodeHandler = () => {
    setCouponCode(0);
    setPromoCode("")
    setCouponMessage("")
    promoInp.current.value = ''
  }

  const promoCodeHandler = (e) => {
    setPromoCode(e.target.value)
  }


  const shipping = 21.0;
  const tax = 1.92;
  const gst = 1.91;

  console.log(cost);


  const calcDiscount = () => {
    console.log(cost);
    let couponN = 0;
    const cuponDiscount = couponCode / 100;
    if (couponCode > 0) {
      couponN = cuponDiscount * cost;
    }
    console.log(cost);
    // console.log(cost - 0);

    // const couponM = cost - couponN;
    // setCost(couponM.toFixed(2))
  }


  useEffect(() => {
    const totalPrice = products.reduce((pre, product) => pre + product.amount * product.discountPrice, 0);
    setTotalPrice(totalPrice.toFixed(2));
    const totalAmount = totalPrice + shipping + tax + gst;
    setCost(totalAmount.toFixed(2))
    calcDiscount()
  }, [products]);

  useEffect(() => {
    calcDiscount();
  }, [couponCode])



  const clearBaskHandler = () => {
    dispatch(clearBasket());
  };

  return (
    <>
      <div className="bg-black/90 mb-16">
        <Header />
      </div>
      <div className="max-w-screen-2xl mx-auto px-10 pb-16">
        <div className="flex justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
            <div className="w-full pr-24">
              <div className="py-2 mb-4 flex justify-between border-b font-bold border-gray-300">
                <div>Item</div>
                <div className="flex space-x-10 mr-28">
                  <div>Price</div>
                  <div>Qty</div>
                  <div>Subtotal</div>
                </div>
              </div>
              <Products />
              <div className="flex mt-2">
                <div className="flex flex-1">
                  <Link to="/#products" className="mr-6 text-center flex items-center justify-center border-2 border-gray-600 text-gray-600 max-w-52 h-9 w-full rounded-2xl">
                    Continue Shopping
                  </Link>
                  <button type="button" onClick={clearBaskHandler} className="bg-black text-white max-w-52 h-9 w-full rounded-2xl">
                    Clear Shopping Cart
                  </button>
                </div>

                <div className="flex flex-1 justify-end">
                  <button type="button" className="bg-black text-white max-w-52 h-9 w-full rounded-2xl">
                    Update Shopping Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-5 rounded-md bg-slate-100 p-6 max-w-sm drop-shadow-lg h-auto mt-16 self-start">
            {products.length > 0 ? <div>
              <div className="mb-3">
                <h1 className="font-bold text-2xl">Summary</h1>
              </div>
              <div className="border-b border-gray-400 pb-4">
                <div className="mb-2">
                  <h5 className="mb-1 text-lg">Estimate Shipping and Tax</h5>
                  <p className="text-sm">Enter your destination to get a shipping estimate.</p>
                </div>
                <div>
                  <h5 className="text-lg">Apply Discount Code</h5>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex justify-between font-bold text-xs">
                  <div>Subtotal</div>
                  <div>${totalPrice}</div>
                </div>

                <div className="flex justify-between font-bold text-xs">
                  <div>
                    <div className="mb-1.5">Shipping</div>
                    <p className="text-gray-500 font-regular">(Standard Rate - Price may vary depending on the item/destination. TECS Staff will contact you.)</p>
                  </div>
                  <div>${shipping.toFixed(2)}</div>
                </div>

                <div className="flex justify-between font-bold text-xs">
                  <div>Tax</div>
                  <div>${tax}</div>
                </div>

                <div className="flex justify-between font-bold text-xs">
                  <div>GST (10%)</div>
                  <div>${gst.toFixed(2)}</div>
                </div>

                <div>
                  <div className="flex">
                    <input onChange={promoCodeHandler} type="text" ref={promoInp} className="h-10 pl-4 block mr-2 rounded-md max-w-64 w-full" placeholder="Promo code" />
                    {
                      couponCode > 0 ? <button onClick={removeCouponCodeHandler} type="button" className="h-10 w-16 rounded-md bg-orange-600 text-white">
                        <MdDeleteOutline className="m-auto text-xl" />
                      </button> :
                        <button onClick={promoCodeConfirm} type="button" className="h-10 px-3 bg-orange-600 text-white rounded-md text-base">
                          {isLoading ? 'Applying' : 'Apply'}
                        </button>
                    }
                  </div>
                  {
                    couponMessage &&
                    <div className="mt-2">
                      <p className="text-base text-orange-600">{couponMessage}</p>
                    </div>
                  }

                </div>

                <div className="flex justify-between font-bold text-xs">
                  <div className="text-base">Order Total</div>
                  <div className="text-base">${cost}</div>
                </div>
              </div>
              <div className="mt-4">
                <button type="button" onClick={checkoutHandler} className="bg-orange-600 block flex items-center justify-center mb-2 rounded-full text-white h-12 w-full font-semibold mb-3.5">Checkout</button>
                {/* <button className="bg-orange-600 mb-2 rounded-full text-blue-950 h-12 w-full font-semibold mb-3.5">
                <span>Check out with</span>
              </button> */}
              </div>
            </div> :
              <div className="w-full">
                <div>
                  <p className="mb-4 text-center text-base px-6">
                    The best place to start choosing is the home page
                  </p>
                </div>
                <Link to='/' className="bg-orange-600 mb-2 block flex items-center justify-center rounded-full text-white h-12 w-full font-semibold mb-3.5">To the main</Link>
              </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
