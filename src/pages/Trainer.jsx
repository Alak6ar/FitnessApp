import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { FaFacebook, FaInstagram, FaSnapchat, FaYoutube } from "react-icons/fa";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // AuthContext'i içe aktar
import { useTrainerQuery } from "../services/productApi";

const Trainer = () => {
  const { id } = useParams();
  const {data: trainer, isLoading} = useTrainerQuery(id)
  console.log(trainer);

  
  return (
    <div className="trainer-page">
      <Header/>
      <div className="container">
        {/* <Header /> */}
        {
          isLoading ? 'Loading' :  (
            (
              <div className="trainer-detail">
            <div className="trainer-up">
              <h1>
                {trainer?.firstName} {trainer?.lastName}
              </h1>
            </div>
  
            <div className="trainer-flex">
              <div className="trainer-left">
                {trainer?.imageUrl ? (
                  <img src={trainer?.imageUrl} alt={trainer?.firstName} />
                ) : (
                  <p>Fotoğraf mevcut değil</p>
                )}
  
                <div className="trainer-about">
                  <p>Experience: <span>{trainer?.experience}</span></p>
                  <p>Age: <span>{trainer?.age}</span></p>
                  <p>Weight: <span>{trainer?.weight}</span></p>
                  <p>Email: <Link to={`mailto:${trainer?.email}`}>{trainer?.email}</Link></p>
                  <p>Phone: <Link to={`tel:${trainer?.phoneNumber}`}>{trainer?.phoneNumber}</Link></p>
                </div>
                <div className="vc-overly">
                  <ul>
                    <li><Link to="#"><FaFacebook /></Link></li>
                    <li><Link to="#"><FaInstagram /></Link></li>
                    <li><Link to="#"><FaYoutube /></Link></li>
                    <li><Link to="#"><FaSnapchat /></Link></li>
                  </ul>
                </div>
              </div>
  
              <div className="trainer-right">
                <div className="trainer-about">
                  <h1>{trainer?.firstName} {trainer?.lastName}</h1>
                  <p>{trainer?.positionName}</p>
                  <h4>Biography</h4>
                  <p>{trainer?.biography}</p>
                </div>
  
                <div className="trainer-skills">
                  <h3>Skills:</h3>
                  <div className="skill">
                    <div className="progress">
                      <div className="lead">Yoga</div>
                      <div className="progress-bar wow fadeInLeft" style={{ width: `${trainer?.age}%` }}>
                        <span>{trainer?.age}%</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div className="lead">Boxing</div>
                      <div className="progress-bar wow fadeInLeft" style={{ width: `${trainer?.weight}%` }}>
                        <span>{trainer?.weight}%</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div className="lead">GYM</div>
                      <div className="progress-bar wow fadeInLeft" style={{ width: `${trainer?.experience}%` }}>
                        <span>{trainer?.experience}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ) 
          )
        }
      </div>
      <Footer />
    </div>
  );
};

export default Trainer;
