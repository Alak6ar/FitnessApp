import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 

const Client = () => {
  const [clients, setClients] = useState([]);
  const apiURL = "http://alihuseyn1-001-site1.otempurl.com/api/Client/";
  const { token, login } = useAuth(); 

  useEffect(() => {
    // console.log("Mevcut token:", token); 
    const fetchClients = async () => {
      try {
        const response = await axios.get(apiURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setClients(response.data);
      } catch (error) {
        // console.error(
        //   "API Hata:",
        //   error.response ? error.response.data : error.message
        // );
      }
    };
  
    fetchClients();
  }, [token, login]);
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="client">
      <div className="container">
        <h1>WHAT CLIENT'S SAY</h1>
        <Slider {...settings}>
          {clients.map((client) => (
            <div key={client.userId || client.id}>
              <div className="rt-vc-item media">
                <div className="pull-left rt-vc-img">
                  <img src={client.imageUrl} alt="" />
                </div>
                <div className="media-body rt-vc-content">
                  <h3>
                    {client.firstName} {client.lastName}
                    <span className="rating">
                      {Array.from({ length: client.rating }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </span>
                  </h3>
                  <p>{client.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Client;
