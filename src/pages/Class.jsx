import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaClock, FaSearch, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { FaPerson } from "react-icons/fa6";

const BASE_URL = "http://alihuseyn1-001-site1.otempurl.com/api/Classes";

const Class = () => {
  const { id } = useParams();
  const { token, login, error, username, password } = useAuth();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClass = async () => {
      if (!token) {
        await login();
      } else {
        try {
          const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClassData(response.data);
        } catch (error) {
          console.error("Error fetching class:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClass();
  }, [id, token, login]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!classData) return <p>Ders bulunamadı</p>;

  const getDayName = (dayOfWeek) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayOfWeek] || "Bilinmeyen Gün"; 
  };
  const uniqueSchedules = [
    ...new Map(
      classData.schedules.map((schedule) => [
        `${schedule.trainerName}-${schedule.startTime}-${schedule.endTime}`, // Benzersiz anahtar oluştur
        schedule,  
      ])
    ).values(),
  ];

  return (
    <div className="class-page">
      <div className="container">
        <Header />
        <div className="class-detail">
          <div className="class-up">
            <h1>{classData.name}</h1>
          </div>
          <div className="class-flex">
            <div className="class-left">
              <div className="class-img">
                <img
                  src={
                    classData.imageUrl?.startsWith("http")
                      ? classData.imageUrl
                      : "path/to/default-image.jpg"
                  }
                  alt={classData.name}
                />
              </div>
              <div className="class-desc">
                <p>{classData.description}</p>
                <div className="clas-schedule">
                      <h3>Schedule:</h3>
                  <div className="time">
                    <ul>
                      {classData.schedules && classData.schedules.length > 0 ? (
                        uniqueSchedules.map((schedule, index) => (
                          <li key={index}>
                            <FaClock /> Class time:
                            <span> {getDayName(schedule.dayOfWeek)}</span>{" "}
                            <p>
                              {schedule.startTime}am - {schedule.endTime}pm
                            </p>
                          </li>
                        ))
                      ) : (
                        <p>Program bulunmuyor</p>
                      )}
                    </ul>
                    <div className="sche-trainer">
                      <ul>
                        {uniqueSchedules.map((schedule, index) => (
                          <li key={index}>
                            <FaUser /> Trainer:{" "}
                            <span>{schedule.trainerName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="class-right">
              <div className="search">
                <p>Search</p>
                <form method="get" className="search-form">
                  <div className="custom-search-input">
                    <div className="input-group">
                      <input
                        type="text"
                        className="search-query form-control"
                        placeholder="Search here ..."
                      />
                      <span className="input-group-prepend">
                        <button className="btn btn-danger" type="submit">
                          <FaSearch />
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="links">
                <p>Categories</p>
                <ul>
                  <li>
                    <Link>Fitness (11)</Link>
                  </li>
                  <li>
                    <Link>Gym (11)</Link>
                  </li>
                </ul>
              </div>
              <div className="links">
                <p>Archives</p>
                <ul>
                  <li>
                    <Link>June 2017 (11)</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Class;
