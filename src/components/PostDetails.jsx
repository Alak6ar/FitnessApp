import React, { useEffect, useState } from "react";
import { usePostDetailsQuery } from "../services/productApi";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Footer from "./Footer";


const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = usePostDetailsQuery(id);


  return (
    <div className="flex flex-col">
      <div className="bg-black mb-12">
        <Header />
      </div>
      <div className="container px-8">
        <div className="flex">
          {isLoading ? (
            "Loading..."
          ) : (
            <div>
              <div>
                <img src={data?.imageUrl} alt="" className="max-w-3xl w-full h-96 object-cover" />
              </div>
              <div className="flex space-x-5 my-8">
                <div className="flex items-center">
                  <FaCalendar className="text-orange-600 mr-2" />
                  {data?.createdAt.substring(0,10).replace(/-/g, "/")}
                </div>
                <div className="flex items-center">
                  <FaUser className="text-orange-600 mr-2" />
                  By: <span className="text-orange-600 ml-1"> {data?.firstName + ' ' + data?.lastName}</span>
                </div>
              </div>
              <div className="h-px w-full bg-gray-300 mb-10"></div>
              <h1 className="text-4xl mb-10">{data?.name}</h1>
              <div>
                <p className="text-gray-600">
                  {
                    data?.description
                  }
                </p>
              </div>
            </div>
          )}

          <div className="class-right ml-10">
            <div className="search">
              <p className="text-black text-2xl mb-4">Search</p>
              <div className="bg-orange-600 w-[70px] h-[3px]"></div>
              <form method="get" className="pt-2.5">
                <div >
                  <div className="flex w-full">
                    <input
                      type="text"
                      className="bg-[#f5f5f5] h-10 w-full text-base text-[#495057 pl-3"
                      placeholder="Search here ..."
                    />
                    <span className="input-group-prepend flex">
                      <button className="bg-orange-600 h-10 w-10 text-white" type="submit">
                        <FaSearch className="m-auto" />
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="links mt-9">
              <p className="text-2xl">Categories</p>
              <div className="bg-orange-600 w-[70px] h-[3px] mt-4 mb-4"></div>
              <ul className="space-y-1.5">
                <li className="border-b py-2">
                  <Link>Fitness (11)</Link>
                </li>
                <li className="border-b py-2">
                  <Link>Gym (11)</Link>
                </li>
              </ul>
            </div>
            <div className="links mt-9">
              <p className="text-2xl">Categories</p>
              <div className="bg-orange-600 w-[70px] h-[3px] mt-4 mb-4"></div>
              <ul className="space-y-1.5">
                <li className="border-b py-2">
                  <Link>June 2017 (11)  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PostDetails;
