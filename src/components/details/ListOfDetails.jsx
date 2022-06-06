import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./ListOfDetails.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Mousewheel, Scrollbar } from "swiper";
import Detail from "./Detail";
import { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axios";

const ListOfDetails = ({ setSwiper }) => {
  const [listOfDetails, setListOfDetails] = useState([]);
  const [showAddingTest, setShowAddingTest] = useState(false);
  const [showUpdateTest, setShowUpdateTest] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);
  const [numberOfMelting, setNumberOfMelting] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [comment, setComment] = useState("");
  const [typeOfProduct, setTypeOfProduct] = useState("");
  const [methodic, setMethodic] = useState("");

  const [testInfo, setTestInfo] = useState({});

  const [typeOfProductsList, setTypeOfProductsList] = useState([]);
  const [methodicsList, setMethodicsList] = useState([]);

  const createSegmentAndGetImages = (testId) => {
    console.log(testId, testInfo, length, width);
    axiosInstance
      .post("/api/imaging/segment/", {
        test: testId,
        length: length,
        width: width,
      })
      .then((res) => {
        console.log("/api/imaging/segment/", res);

        axiosInstance
          .post(
            `/api/imaging/segment/${res.data.id}/make_images/?offset=${rangeValue}`
          )
          .then((res) => {
            console.log("/api/imaging/segment/{id}/make_images/",res);
            setListOfDetails((prevArray) => [...prevArray, res.data]);
            console.log(listOfDetails);
          });
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/api/choices/product_type/")
      .then((res) => {
        console.log(res);
        setTypeOfProductsList(res.data);
      })
      .catch((er) => console.log(er));
    axiosInstance
      .get("/api/choices/measurement_technique/")
      .then((res) => {
        console.log(res);
        setMethodicsList(res.data);
      })
      .catch((er) => console.log(er));
  }, []);

  const handleAddTest = () => {
    axiosInstance
      .post("/api/imaging/test/", {
        product_type: typeOfProduct,
        measurement_technique: methodic,
        melting_number: numberOfMelting,
        comment: comment,
        date: null,
      })
      .then((res) => {
        console.log(res);
        setTestInfo(res.data);
        console.log(testInfo);
        createSegmentAndGetImages(res.data.id);
      })
      .catch((er) => console.log(er));
    setShowAddingTest(false);
  };

  const handleUpdateTest = () => {
    createSegmentAndGetImages();
    setShowUpdateTest(false);
  };

  const [img, setImg] = useState("");
  useEffect(() => {
    console.log(rangeValue);
  }, [rangeValue]);
  return (
    <div className="list-of-details">
      <Swiper
        scrollbar={{
          hide: false,
        }}
        mousewheel
        slidesPerView={"auto"}
        // breakpoints={{
        //   900: {
        //     slidesPerView: 2,
        //   },
        //   1680: {
        //     slidesPerView: 4,
        //   },
        // }}
        spaceBetween={24}
        modules={[Scrollbar, Mousewheel]}
        className="mySwiper"
      >
        {listOfDetails.length !== 0 &&
          listOfDetails.map((el, index) => {
            console.log(el,"ой уо")
            return (
              <SwiperSlide>
                <Detail
                  detailInfo={el}
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
                Добавить часть и создать тест
              </div>
              <div className="add-new-detail__body w-100 d-flex align-items-center justify-content-center">
                <Button
                  className="d-flex align-items-center"
                  variant="primary"
                  onClick={() => setShowAddingTest(true)}
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

      {/* ! */}
      {/* Добавление теста  */}
      <Modal show={showAddingTest} onHide={() => {}} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="adding-image__screen">
                <img
                  src={`http://${process.env.REACT_APP_SERVER_SEVERSTAL}/api/imaging/current_image/?offset=${rangeValue}`}
                  alt="camera-img"
                  className="w-100 h-100"
                />
              </div>
              <Form.Group
                as={Row}
                className="d-flex align-items-center adding-image__range"
              >
                <Col xs="9">
                  <Form.Range
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                    className=""
                  />
                </Col>
                <Col xs="3">
                  <Form.Label>{rangeValue + "ед.смещения"}</Form.Label>
                </Col>
              </Form.Group>
            </Col>
            {/* Панель */}
            <Col>
              <Form className="adding-image__form">
                <Form.Group>
                  <Form.Select
                    className="mb-3"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTypeOfProduct(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Вид продукции
                    </option>
                    {typeOfProductsList.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Control
                    type="number"
                    placeholder="Номер плавки ручья"
                    className="mb-3"
                    value={numberOfMelting}
                    onChange={(e) => setNumberOfMelting(e.target.value)}
                  />
                  <Form.Text className="">Сечение, мм</Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Длина"
                    className="mb-2"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Ширина"
                    className="mb-2"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    placeholder="Комментарий, если необходимо"
                    className="mb-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Form.Select
                    className="mb-2"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setMethodic(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Методика измерения
                    </option>
                    {methodicsList.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => setShowAddingTest(false)}
            className=""
          >
            Отмена
          </Button>
          <Button variant="primary" onClick={handleAddTest}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ! */}
      {/* Обновление теста  */}
      <Modal show={showUpdateTest} onHide={() => {}} animation={true}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="adding-image__screen">
                <img
                  src={`http://${process.env.REACT_APP_SERVER_SEVERSTAL}/api/imaging/current_image/?offset=${rangeValue}`}
                  alt="camera-img"
                  className="w-100 h-100"
                />
              </div>
              <Form.Group
                as={Row}
                className="d-flex align-items-center adding-image__range"
              >
                <Col xs="9">
                  <Form.Range
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                    className=""
                  />
                </Col>
                <Col xs="3">
                  <Form.Label>{rangeValue + "ед.смещения"}</Form.Label>
                </Col>
              </Form.Group>
            </Col>
            {/* Панель */}
            <Col>
              <Form className="adding-image__form">
                <Form.Group>
                  {/* <Form.Select
                    className="mb-3"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTypeOfProduct(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Вид продукции
                    </option>
                    {typeOfProductsList.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </Form.Select> */}
                  {/* <Form.Control
                    type="number"
                    placeholder="Номер плавки ручья"
                    className="mb-3"
                    value={numberOfMelting}
                    onChange={(e) => setNumberOfMelting(e.target.value)}
                  /> */}
                  <Form.Text className="">Сечение, мм</Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Длина"
                    className="mb-2"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Ширина"
                    className="mb-2"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    placeholder="Комментарий, если необходимо"
                    className="mb-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  {/* <Form.Select
                    className="mb-2"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setMethodic(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Методика измерения
                    </option>
                    {methodicsList.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </Form.Select> */}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => setShowAddingTest(false)}
            className=""
          >
            Отмена
          </Button>
          <Button variant="primary" onClick={handleUpdateTest}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListOfDetails;
