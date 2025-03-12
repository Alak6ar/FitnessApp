import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { usePostsQuery } from "../services/productApi";

const Posts = () => {

  const { data, isFetching, isLoading } = usePostsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.16,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  return (
    <div className="posts" id="posts">
      <div className="container">
        <div className="post-up">
          <h1>LATEST POSTS</h1>
          <div className="line"></div>
        </div>

        {/* <Slider {...settings}> */}
          <div className="flex flex-wrap gap-8 mb-14 mx-auto md:max-w-[759px] xl:max-w-full">
          {isLoading || isFetching
            ? "Loading..."
            : data.map((p, i) => (
                <div className="single-item w-[358px]" key={i}>
                  <div className="single-item-meta">
                    <Link to={`post-details/${p.id}`} className="single-item-image">
                      <img className="w-96 h-48 object-cover"
                        src={p.imageUrl}
                        alt=""
                      />
                    </Link>
                    <div className="date">
                      {p.createdAt.substring(0,10).replace(/-/g, "/")}
                    </div>
                  </div>
                  <div className="single-item-content">
                    <h3><Link to={`post-details/${p.id}`}>{p.name}</Link></h3>
                    <p>{p.description}</p>
                  </div>
                </div>
            ))
          }
          </div>
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default Posts;
