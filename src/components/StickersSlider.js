import React from "react"
import Slider from "react-slick";
import { StaticImage } from "gatsby-plugin-image"

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
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/1.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/3.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/4.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/5.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/13.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/6.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/7.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/8.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/2.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/9.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/10.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/11.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/12.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/14.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/15.jpg" alt="Pixel Cup Sticker" />
      </div>
      <div className="mx-4 !w-40 md:!w-36">
        <StaticImage width={288} height={360} placeholder="blurred" src="../assets/images/stickers/16.jpg" alt="Pixel Cup Sticker" />
      </div>
    </Slider>
  )
};

export default StickersSlider;