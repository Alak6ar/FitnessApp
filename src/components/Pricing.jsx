import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { usePlanWithoutTrainerQuery, usePlanWithTrainerQuery, useSubscribeMutation } from "../services/productApi";
import SubscribeBtn from "./SubscribeBtn";

const Pricing = () => {
  const [tab, setTab] = useState(false);
  const { data: withTrainer } = usePlanWithTrainerQuery();
  const { data: withoutTrainer } = usePlanWithoutTrainerQuery();


  const showWithTrainerTab = () => {
    setTab(true)
  }

  const showWithoutTrainerTab = () => {
    setTab(false)
  }

  return (
    <div>
      <div className="pricing">
        <div className="container">
          <div className="flex items-center">
            <h1 className="text-4xl mr-6">OUR PRICING PLAN</h1>
            <div className="h-px bg-orange-600 w-4/6"></div>
          </div>
          <div className="bg-white h-12 max-w-80 rounded-full flex font-semibold mx-auto mb-28 mt-14">
            <button type="button" onClick={showWithoutTrainerTab} className={"rounded-full px-4 h-full w-40 " + (tab ? 'bg-white' : 'bg-orange-600 text-white')}>Without Trainer</button>
            <button type="button" onClick={showWithTrainerTab} className={'px-4 h-full rounded-full w-40 ' + (tab ? 'bg-orange-600 text-white' : '')}>With Trainer</button>
          </div>
          {
            tab ? (
              <div className="pricing-flex">
                {
                  withTrainer?.map((d, i) => (
                    <div className="pricing-card max-w-[356px] w-full">
                      <h2 className="text-2xl font-semibold text-center mb-5 text-red-600">{d?.name}</h2>
                      <div>
                        <span className="text-base text-white">
                          {d?.description}
                        </span>
                      </div>
                      <p className="text-5xl text-white font-semibold mt-4">${d.price}</p>
                      <span className="text-lg text-white mt-4">{d?.durationText} Package</span>
                      <ul className="mb-4">
                        {
                          d?.features?.map((f, i) => (
                            <li key={i}><FaCheckCircle />{f}</li>
                          ))
                        }
                        <SubscribeBtn id={d.id} price={d.price} />
                      </ul>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="pricing-flex">
                {
                  withoutTrainer?.map((d, i) => (
                    <div className="pricing-card max-w-[356px] w-full" key={i}>
                      <h2 className="text-2xl font-semibold text-center mb-5 text-red-600">{d?.name}</h2>
                      <div>
                        <span className="text-base text-white">
                          {d?.description}
                        </span>
                      </div>
                      <p className="text-5xl text-white font-semibold mt-4">${d.price}</p>
                      <span className="text-lg text-white mt-4">{d?.durationText} Package</span>
                      <ul className="">
                        {
                          d?.features?.map((f, i) => (
                            <li key={i}><FaCheckCircle />{f}</li>
                          ))
                        }
                        <SubscribeBtn id={d.id} price={d.price} />
                      </ul>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Pricing;
