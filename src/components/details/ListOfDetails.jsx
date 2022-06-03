import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./ListOfDetails.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Mousewheel, Scrollbar } from "swiper";
import Detail from "./Detail";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../context/authContext";
import axios from "axios";

const ListOfDetails = ({ listOfDetails, setSwiper }) => {
  const [showAddingImg, setShowAddingImg] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);
  const handleAnalyse = () => {};

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/imaging/current_image/?offset=${rangeValue}`, {
        headers: {
          Authorization: `Basic ${btoa("admin:tvs-ZWE-LWv-4pb")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        {listOfDetails.length == 0 &&
          listOfDetails.map((el, index) => {
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
            <Col className="list-of-details__add-new-detail add-new-detail add-new-detail_list-is-pure">
              <div className="add-new-detail__header text-start ">
                Добавить часть
              </div>
              <div className="add-new-detail__body w-100 d-flex align-items-center justify-content-center">
                <Button
                  className="d-flex align-items-center"
                  variant="primary"
                  onClick={() => setShowAddingImg(true)}
                >
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
              <div className="add-new-detail__header text-start">
                Новая часть
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
          )}
        </SwiperSlide>
      </Swiper>

      {/* Добавление изображения */}
      <Modal show={showAddingImg} onHide={() => {}} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <div className="adding-image__screen"></div>
            <Form.Group as={Row} className="d-flex align-items-center">
              <Col xs="9">
                <Form.Range
                  value={rangeValue}
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </Col>
              <Col xs="3">
                <Form.Label>{rangeValue + "ед.смещения"}</Form.Label>
              </Col>
            </Form.Group>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListOfDetails;
