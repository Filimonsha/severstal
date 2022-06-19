import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./ListOfDetails.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Mousewheel, Scrollbar } from "swiper";
import Detail from "./Detail";
import { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axios";
import { useForm } from "react-hook-form";
const ListOfDetails = ({
  setListOfDetailsToAnalysis,
  swiper,
  setSwiper,
  currentInfoAboutTest,
  setCurrentInfoAboutTest,
  sideOfLighting,
}) => {
  const [showAddingTest, setShowAddingTest] = useState(false);
  const [showUpdateTest, setShowUpdateTest] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [comment, setComment] = useState("");

  const [testInfo, setTestInfo] = useState({});

  const [typeOfProductsList, setTypeOfProductsList] = useState([]);
  const [methodicsList, setMethodicsList] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const createSegmentAndGetImages = (testId, data) => {
    axiosInstance
      .post("/api/imaging/segment/", {
        // test: Number(currentInfoAboutTest.id),

        test: Number(testId),
        length: Number(data.length),
        width: Number(data.width),
      })
      .then((res) => {

        axiosInstance
          .post(
            `/api/imaging/segment/${Number(
              res.data.id
            )}/make_images/?offset=${Number(rangeValue)}`
          )
          .then((res) => {
            setCurrentInfoAboutTest((prevTestInfo) => ({
              ...prevTestInfo,
              segments: [...prevTestInfo.segments, res.data],
            }));
            setListOfDetailsToAnalysis((prevArray) => [...prevArray, res.data]);
          })
          .catch((er) => console.log(er));
        swiper.slideToClosest();
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    axiosInstance
      .get("/api/choices/product_type/")
      .then((res) => {
        setTypeOfProductsList(res.data);
      })
      .catch((er) => console.log(er));
    axiosInstance
      .get("/api/choices/measurement_technique/")
      .then((res) => {
        setMethodicsList(res.data);
      })
      .catch((er) => console.log(er));
  }, []);

  function setErrors(errors) {
    Object.keys(errors).forEach((key) => {
      setError(key, { message: errors[key].join(","), type: "required" });
    });
  }

  const handleAddTest = (data) => {

    axiosInstance
      .post("/api/imaging/test/", {
        product_type: Number(data.product_type),
        measurement_technique: Number(data.measurement_technique),
        melting_number: data.melting_number,
        comment: comment,
        date: null,
      })
      .then((res) => {
        setTestInfo(res.data);
        createSegmentAndGetImages(res.data.id, data);
        // setCurrentTestId(res.data.id);

        setCurrentInfoAboutTest(res.data);

        setShowAddingTest(false);
      })
      .catch((er) => {
        setErrors(er.response.data);
      });
    // setComment(data.comment);
  };

  const handleUpdateTest = (data) => {
    createSegmentAndGetImages(currentInfoAboutTest.id, data);
    axiosInstance
      .put(`api/imaging/test/${currentInfoAboutTest.id}/`, {
        comment: comment,
      })
      .then((res) =>
        setCurrentInfoAboutTest((prevInfo) => ({
          ...prevInfo,
          comment: comment,
        }))
      );
    setShowUpdateTest(false);
  };

  return (
    <div className="list-of-details p-4">
      <h2 className="list-of-details__title mb-3 text-start">Новый тест</h2>
      <Swiper
        scrollbar={{
          hide: false,
          draggable: true,
        }}
        mousewheel
        draggable
        slidesPerView={1}
        spaceBetween={24}
        modules={[Scrollbar, Mousewheel]}
        className="mySwiper"
      >
        {currentInfoAboutTest.segments.length !== 0 &&
          currentInfoAboutTest.segments.map((el, index) => {
            return (
              <SwiperSlide>
                <Detail
                  setCurrentInfoAboutTest={setCurrentInfoAboutTest}
                  currentInfoAboutTest={currentInfoAboutTest}
                  sideOfLighting={sideOfLighting}
                  detailInfo={el}
                  srcOFImg={require("../assets/door.jpg")}
                  index={index + 1}
                  setSwiper={setSwiper}
                />
              </SwiperSlide>
            );
          })}
        {!currentInfoAboutTest?.date && (
          <SwiperSlide>
            {currentInfoAboutTest.segments.length == 0 ? (
              <Col className="list-of-details__add-new-detail add-new-detail add-new-detail_list-is-pure">
                <div className="add-new-detail__header text-start ">
                  Добавить сегмент и создать тест
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
                  <Button
                    className="d-flex align-items-center"
                    variant="primary"
                    onClick={() => setShowUpdateTest(true)}
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
            )}
          </SwiperSlide>
        )}
      </Swiper>

      {/* ! */}
      {/* Добавление теста  */}
      <Modal
        show={showAddingTest}
        onSubmit={() => console.log("отправлено")}
        onHide={() => {
          setShowAddingTest(false);
        }}
        animation={true}
      >
        <Modal.Header className="border-0 pb-0 align-items-start" closeButton>
          <Modal.Title>
            <h3 className="mb-3">Настройки темплета</h3>
            <h4 className="m-0">Новый тест</h4>
          </Modal.Title>
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
                  <Form.Text className="adding-image__error">
                    {errors.product_type?.message}
                  </Form.Text>
                  <Form.Select
                    className="mb-2"
                    {...register("product_type", {
                      // required: "емае мама звонит",
                    })}
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

                  <Form.Text className="adding-image__error">
                    {errors.melting_number?.message}
                  </Form.Text>
                  <Form.Control
                    type="text"
                    pattern="[0-9 ]+"
                    placeholder="Номер плавки ручья"
                    className="mb-3"
                    {...register("melting_number", {})}
                  />
                  <Form.Text className="">
                    Сечение, мм <br />
                  </Form.Text>
                  <Form.Text className="adding-image__error">
                    {errors.length?.message}
                  </Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Длина"
                    className="mb-2"
                    {...register("length", {
                      required: "Это поле обязательно.",
                      validate: {
                        positive: (v) =>
                          parseInt(v) > 0 || "Должно быть больше 0",
                      },
                    })}
                  />
                  <Form.Text className="adding-image__error">
                    {errors.width?.message}
                  </Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ширина"
                    className="mb-2"
                    {...register("width", {
                      required: "Это поле обязательно.",
                      validate: {
                        positive: (v) =>
                          parseInt(v) > 0 || "Должно быть больше 0",
                      },
                    })}
                  />
                  <Form.Text>Комментарий</Form.Text>
                  <Form.Control
                    as="textarea"
                    placeholder="Комментарий, если необходимо"
                    className="mb-2 "
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Form.Text className="adding-image__error">
                    {errors.measurement_technique?.message}
                  </Form.Text>
                  <Form.Select
                    className="mb-2"
                    {...register("measurement_technique", {
                      // required: "емае мама звонит",
                    })}
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
                  {/* <Form.Select
                    className="mb-2"
                    {...register("measurement_technique", {})}
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
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(handleAddTest)}
          >
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ! */}
      {/* Обновление теста  */}
      <Modal
        show={showUpdateTest}
        onHide={() => {
          setShowUpdateTest(false);
        }}
        animation={true}
      >
        <Modal.Header className="border-0 pb-0 align-items-start" closeButton>
          <Modal.Title>
            <h3 className="mb-3">Добавление детали</h3>
            {/* <h4 className="m-0">Новый тест</h4> */}
          </Modal.Title>
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
                  <Form.Text className="">
                    Сечение, мм <br />
                  </Form.Text>
                  <Form.Text className="adding-image__error">
                    {errors.length?.message}
                  </Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Длина"
                    className="mb-2"
                    {...register("length", {
                      required: "Это поле обязательно.",
                      validate: {
                        positive: (v) =>
                          parseInt(v) > 0 || "Должно быть больше 0",
                      },
                    })}
                  />
                  <Form.Text className="adding-image__error">
                    {errors.width?.message}
                  </Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ширина"
                    className="mb-2"
                    {...register("width", {
                      required: "Это поле обязательно.",
                      validate: {
                        positive: (v) =>
                          parseInt(v) > 0 || "Должно быть больше 0",
                      },
                    })}
                  />
                  <Form.Control
                    as="textarea"
                    placeholder="Комментарий, если необходимо"
                    className="mb-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => setShowUpdateTest(false)}
            className=""
          >
            Отмена
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(handleUpdateTest)}
          >
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListOfDetails;
