import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const LOGIN_URL = "http://alihuseyn1-001-site1.otempurl.com/api/Auth/Login";
const CLASSES_URL = "http://alihuseyn1-001-site1.otempurl.com/api/Classes";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Admin_123");

  useEffect(() => {
    const loginAndFetchClasses = async () => {
      try {
        const loginResponse = await axios.post(LOGIN_URL, {
          usernameOrEmail: username,
          password: password,
        });

        const newToken = loginResponse.data.token;
        setToken(newToken);

        const classesResponse = await axios.get(CLASSES_URL);

        setClasses(classesResponse.data);
      } catch (error) {
        console.error("Error during login or fetching classes:", error);
      }
    };

    loginAndFetchClasses();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.25,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Günlerin dizisini tanımlayalım
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="clases" id="featuredClassesSec">
      <div className="container">
        <div className="clas-up">
          <h1>FEATURED CLASSES</h1>
          <div className="line"></div>
        </div>
        <Slider {...settings}>
          {classes.length > 0 ? (
            classes.map((classItem) => {
              const trainer =
                classItem.schedules.length > 0
                  ? classItem.schedules[0].trainerName
                  : "No Trainer Assigned";
              return (
                <div key={classItem.id} className="single-item">
                  <div className="single-item-content">
                    <div className="clases-img">
                      <img
                        src={classItem.imageUrl?.startsWith("http") ? classItem.imageUrl : "path/to/default-image.jpg"}
                        alt={classItem.name}
                        onError={(e) => { e.target.src = "path/to/default-image.jpg"; }}
                      />
                    </div>
                    <div className="overly">
                      <ul>
                        {classItem.schedules.length > 0 ? (
                          // 1. Adım: Gelen günleri sıralıyoruz
                          classItem.schedules
                            .sort((a, b) => a.dayOfWeek - b.dayOfWeek) // Sıralama işlemi
                            .map((schedule, index) => {
                              const dayName = dayNames[schedule.dayOfWeek - 1]; // Gün numarasını gün adına çevir
                              return (
                                <li key={index}>
                                  <ul className="class-slider-ul-child">
                                    <li>{`${dayName}`}</li>
                                    <li>{`${schedule.startTime}`}</li>
                                  </ul>
                                </li>
                              );
                            })
                        ) : (
                          <li>Program bulunmuyor</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <Link className="single-item-meta" to={`/classes/${classItem.id}`}>
                    <h3>{classItem.name}</h3>
                    <span>
                      <FaUser /> {trainer}
                    </span>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No classes available</p>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Classes;
