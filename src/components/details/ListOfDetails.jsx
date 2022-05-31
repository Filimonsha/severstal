import { Button, Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./ListOfDetails.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Mousewheel, Scrollbar } from "swiper";
import Detail from "./Detail";



const ListOfDetails = ({ listOfDetails, setSwiper }) => {
  return (
    <div className="list-of-details">
      <Swiper
        scrollbar={{
          hide: false,
        }}
        mousewheel
        breakpoints={{
          900: {
            slidesPerView: 2,
          },
          1680: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={24}
        modules={[Scrollbar, Mousewheel]}
        className="mySwiper"
      >
        {listOfDetails.map((el, index) => {
          return (
            <SwiperSlide>
              <Detail
                srcOFImg={require("../assets/door.jpg")}
                index={index + 1}
                setSwiper={setSwiper}
              />
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          {listOfDetails.length == 0 ? (
            <Col className="list-of-details__add-new-detail add-new-detail">
              <div className="add-new-detail__header text-start ">
                Новая часть ыыы
              </div>
              <div className="add-new-detail__body d-flex align-items-center justify-content-center">
                <Button className="d-flex align-items-center" variant="primary">
                  <svg
                    className="me-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  ДОБАВИТЬ ИЗОРАЖЕНИЕ
                </Button>
              </div>
            </Col>
          ) : (
            <Col className="list-of-details__add-new-detail add-new-detail">
              <div className="add-new-detail__header text-start">Новая часть</div>
              <div className="add-new-detail__body d-flex align-items-center justify-content-center">
                <Button className="d-flex align-items-center" variant="primary">
                  <svg
                    className="me-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  ДОБАВИТЬ ИЗОРАЖЕНИЕ
                </Button>
              </div>
            </Col>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ListOfDetails;
