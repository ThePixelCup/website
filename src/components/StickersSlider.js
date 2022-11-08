import React from "react"
import Slider from "react-slick";

// Assets
import sticker1 from "../assets/images/stickers/1.png";
import sticker2 from "../assets/images/stickers/2.png";
import sticker3 from "../assets/images/stickers/3.png";
import sticker4 from "../assets/images/stickers/4.png";

// Settings
const settings = {
  dots: false,
  className: 'center',
  centerMode: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerPadding: '100px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 900,
      settings: {
        centerPadding: '60px',
        slidesToShow: 4
      }
    },
    {
      breakpoint: 750,
      settings: {
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

const StickersSlider = () => {
  return (
    <Slider {...settings}>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker1} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker2} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker3} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker4} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker1} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker2} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker3} alt="The Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <img className="" src={sticker4} alt="The Pixel Cup Sticker" />
      </div>
    </Slider>
  )
};

export default StickersSlider;