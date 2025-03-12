import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaSnapchat, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // AuthContext'i içe aktar
import { useTrainersQuery } from "../services/productApi";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth(); // AuthContext'ten token'ı al
  const {data} = useTrainersQuery();
  console.log(data);
  
  console.log(trainers);
  
 // Token değişirse yeniden çağır

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="trainers" id="trainersSec">
      <div className="container">
        <div className="trainers-up">
          <h1>EXPERT TRAINERS</h1>
          <div className="line"></div>
        </div>
        <Slider {...settings}>
          {data?.map((trainer) => (
            <div key={trainer?.id} className="trainer-card">
              <div className="vc-item-wrap">
                <div className="vc-item">
                  <div className="trainer-img">
                    <img src={trainer?.imageUrl} alt={trainer?.firstName} />
                  </div>
                  <div className="vc-overly">
                    <ul>
                      <li><Link><FaFacebook /></Link></li>
                      <li><Link><FaInstagram /></Link></li>
                      <li><Link><FaYoutube /></Link></li>
                      <li><Link><FaSnapchat /></Link></li>
                    </ul>
                  </div>
                  <div className="vc-team-meta" onClick={() => navigate(`/trainer/${trainer?.id}`)}>
                    <h3>{trainer?.firstName} {trainer?.lastName}</h3>
                    <div>{trainer?.positionName}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Trainers;
