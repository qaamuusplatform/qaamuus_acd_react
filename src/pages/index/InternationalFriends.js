// import node module libraries
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// import sub components
import useSWR from "swr";
import axios from "axios";
import { Card, Col, Image } from "react-bootstrap";
import { END_POINT } from "helper/constants";
// import data files

const InternationalFriends = () => {
  const { data: internationalFriendsData, error } = useSWR(
    "/api/ourInternationalFriends-list/",
    async (url) => await axios(url).then((r) => r.data)
  );
  const settings = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="pb-sm-5 bg-white rounded mb-3 pt-5 slick-slider-wrapper">
      {internationalFriendsData?.map((item, index) => {
        return (
          <div className="item px-md-1 bg-white" key={index}>
              <Image
                height={76}
                src={END_POINT + item.image}
                alt=""
              />
          </div>
          // <div className="item px-md-1 bg-white" key={index}>
          // 	<Card className="card-bordered border-primary-800 bg-dark h-100">
          // 		<Card.Img variant="top"  src={END_POINT +item.image} />
          // 		{/* card body  */}

          // 	</Card>
          // </div>
        );
      })}
    </Slider>
  );
};

// Specifies the default values for props
InternationalFriends.defaultProps = {
  recommended: false,
  popular: false,
  trending: false,
};

// Typechecking With PropTypes
InternationalFriends.propTypes = {
  recommended: PropTypes.bool,
  popular: PropTypes.bool,
  trending: PropTypes.bool,
};

export default InternationalFriends;
