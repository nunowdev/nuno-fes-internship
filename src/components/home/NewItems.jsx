import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";

const NewItems = () => {
  async function nftApiRequest() {
    setNftData([]);
    const requestedData = await Axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    setNftData(requestedData.data);
  }

  const [nftData, setNftData] = useState([]);
  const skeletonDataArray = ["1", "2", "3", "4", "5", "6"];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    nftApiRequest();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {nftData.length > 1 ? (
            <Slider {...sliderSettings}>
              {nftData.map((nft) => (
                <div className="nft_slider" key={nft.nftId}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {nft.expiryDate && (
                      <div className="de_countdown">
                        <Countdown time={nft.expiryDate} />
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...sliderSettings}>
              {skeletonDataArray.map((skeletonItem) => (
                <div className="" key={skeletonItem}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton width={50} height={50} borderRadius={50} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="de_countdown">
                      <Skeleton width={90} height={10} borderRadius={8} />
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width={500} height={260} borderRadius={8} />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width={150} />
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton width={75} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton width={25} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
