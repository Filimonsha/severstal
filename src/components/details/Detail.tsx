import Ruler from "@scena/ruler";
import { useEffect, useRef, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { Helmet } from "react-helmet";
import ScrollContainer from "react-indiana-drag-scroll";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import axiosInstance from "../../helpers/axios";
import { IImages, ISegment, ITest } from "../../types/interfaces";
import "./Detail.css"
import "./rulez-black.css"


interface IProps {
  detailInfo: ISegment,
  setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
  currentInfoAboutTest: ITest,
  srcOFImg: string,
  index: number,
  setSwiper: any,
  sideOfLighting: boolean,
}

const multiplier = 7.02358589



const Detail = (props: IProps) => {
  const [show, setShow] = useState(false)
  const [allowScrolling, setAllowScrolling] = useState(true)
  const [alert, setAlert] = useState(false)
  const [currentScale, setCurrentScale] = useState(1)
  const [imageH, setImageH] = useState(782)
  const [imageW, setImageW] = useState(521)
  const [clickedImage, setClickedImage] = useState<string>("")
  const [imageDeleted, setImageDeleted] = useState(false)
  const [pixNum, setPixNum] = useState(1)

  const swiper = useSwiper()

  useEffect(() => {
    props.setSwiper(swiper)
  })
  useEffect(() => {
    axiosInstance.get("/api/imaging/stand_settings/").then((res => setPixNum(res.data.pix_num)))
  }, [])


  const handleDeleteImage = (el: IImages) => {
    axiosInstance.delete(`/api/imaging/image/${el.id}/autodelete/`).then(res => {
      let segments = props.currentInfoAboutTest.segments
      if (!res.data.deleted_segment) {
        segments.forEach((segment, index) => {
          if (segment.id === props.detailInfo.id) {
            segments[index].images = segments[index].images.filter(image => {
              // return image.number !== el.number
              return image.id !== el.id

            })
          }
        })
      } else {
        segments = segments.filter(segment => segment.id !== props.detailInfo.id)
      }


      props.setCurrentInfoAboutTest(prevInfo => ({ ...prevInfo, segments: segments }))
    }
    )
      .catch(er => console.log(er))
  }
  return (
    <>

      <div className='detail'>
        <div className="detail__header text-start">
          {"?????????? " + props.index}


        </div>
        <div className="detail__img d-flex" >
          <Swiper
            scrollbar={{
              hide: true,
            }}
            nested
            mousewheel
            // slidesPerView={3}
            slidesPerView={"auto"}

            modules={[Scrollbar, Mousewheel]}
            className=""
          >

            {
              props.detailInfo.images.map(el => {
                if (props.sideOfLighting) {
                  // if (el.light === "top") {
                  return (<SwiperSlide className="image-slide">
                    {
                      !props.currentInfoAboutTest.date &&
                      <svg className="image-slide__delete-image" onClick={event => handleDeleteImage(el)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                        <path d="M7 10H9H25" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 10V8C12 7.46957 12.2107 6.96086 12.5858 6.58579C12.9609 6.21071 13.4696 6 14 6H18C18.5304 6 19.0391 6.21071 19.4142 6.58579C19.7893 6.96086 20 7.46957 20 8V10M23 10V24C23 24.5304 22.7893 25.0391 22.4142 25.4142C22.0391 25.7893 21.5304 26 21 26H11C10.4696 26 9.96086 25.7893 9.58579 25.4142C9.21071 25.0391 9 24.5304 9 24V10H23Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 15V21" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18 15V21" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    }
                    <img src={`${el.file_top_crop}`} alt="" className="me-3" onClick={() => {
                      setShow(true)
                      setClickedImage(el.file_top_full)

                    }} />
                  </SwiperSlide>)
                  // }
                } else if (!props.sideOfLighting) {
                  // if (el.light === "front") {
                  return (<SwiperSlide className="image-slide">
                    {
                      !props.currentInfoAboutTest.date &&
                      <svg className="image-slide__delete-image" onClick={event => handleDeleteImage(el)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                        <path d="M7 10H9H25" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 10V8C12 7.46957 12.2107 6.96086 12.5858 6.58579C12.9609 6.21071 13.4696 6 14 6H18C18.5304 6 19.0391 6.21071 19.4142 6.58579C19.7893 6.96086 20 7.46957 20 8V10M23 10V24C23 24.5304 22.7893 25.0391 22.4142 25.4142C22.0391 25.7893 21.5304 26 21 26H11C10.4696 26 9.96086 25.7893 9.58579 25.4142C9.21071 25.0391 9 24.5304 9 24V10H23Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 15V21" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18 15V21" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    }


                    <img src={`${el.file_front_crop}`} alt="" className="me-3" onClick={() => {
                      setShow(true)
                      setClickedImage(el.file_front_full)
                      setAllowScrolling(true)
                    }} />
                  </SwiperSlide>)
                  // }
                }
              })

            }
          </Swiper>

        </div>
      </div>





      <Modal show={show} onHide={() => {
        setShow(false)
        setAllowScrolling(true)
      }}>
        <Helmet>
          <script>
            {`
        var currentScale = 1;
        var lineScale = 5;
      var lineShift = 40;

       // Canvas
              var line, isDown;
      var arr = new Array();
      var startx = new Array();
      var endx = new Array();
      var starty = new Array();
      var endy = new Array();
      var temp = 0;
      var graphtype;
      trigger = "1";
      var text;
      var switchRegime = document.getElementById("draw-switch")
      switchRegime.value="off"
      switchRegime.addEventListener("click",function (e){
                        if (e.target.value !== "off") {
                  e.target.value = "off"

                } else {
                  e.target.value = "on "
                }

      })
      document.getElementById("removeAllLines").addEventListener("click",function (e){
        canvas.clear()
      })
      var canvas = (this.__canvas = new fabric.Canvas("img", {
        hoverCursor: "pointer",
        selection: false,
      }));
      fabric.Object.prototype.transparentCorners = false;

      canvas.on("mouse:down", function (o) {
        if(switchRegime.value==="off"){
          trigger= "0"
        }else{
          trigger = "1"
        }
        if (trigger == "1") {
          isDown = true;
          var pointer = canvas.getPointer(o.e);
          // canvas.width = 1000 
          var points = [pointer.x, pointer.y -lineShift, pointer.x, pointer.y -lineShift];
          startx[temp] = pointer.x;
          starty[temp] = pointer.y - lineShift;
          line = new fabric.Line(points, {
            strokeWidth: lineScale,
            stroke: "red",
            originX: "center",
            originY: "center",
          });
          canvas.add(line);
        } else {
          canvas.forEachObject(function (o) {
            o.setCoords();
          });
        }
      });

      canvas.on("mouse:move", function (o) {

        canvas.remove(text);
        canvas.renderAll();
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        line.set({ x2: pointer.x, y2: pointer.y - lineShift });

        endx[temp] = pointer.x;
        endy[temp] = pointer.y - lineShift;

        if (trigger == "1") {
          var px = Calculate.lineLength(
            startx[temp],
            starty[temp],
            endx[temp],
            endy[temp]
          ).toFixed(2);

            text = new fabric.Text((((px*(1/currentScale))/${pixNum})*${multiplier}).toFixed(3), {
              // ????????????
            // left: endx[temp],
            left:(Math.round((endx[temp] + startx[temp])/2) - 20),
            top: endy[temp],
            fontSize: 18,
            fill:'white',
          });
          canvas.add(text);
        }

        canvas.renderAll();
      });

      canvas.on("mouse:up", function (o) {

          // console.log("??????????",           startx,
          //   starty[temp],
          //   endx[temp],
          //   endy)

                          var px = Calculate.lineLength(
            startx[temp],
            starty[temp],
            endx[temp],
            endy[temp]
          ).toFixed(2);
            text = new fabric.Text((((px*(1/currentScale))/${pixNum})*${multiplier}).toFixed(3), {
            left:(Math.round((endx[temp] + startx[temp])/2) - 20),
            top: endy[temp],
            fontSize: 18,
            fill:'white',
          });
          if(!startx.length===0){
          canvas.add(text);

          }
        var pointer = canvas.getPointer(o.e);

        isDown = false;
      });

      canvas.on("mouse:over", function (e) {

        e.target.setStroke("blue");
        canvas.renderAll();
      });

      canvas.on("mouse:out", function (e) {
        e.target.setStroke("red");
        canvas.renderAll();
      });

      var Calculate = {
        lineLength: function (x1, y1, x2, y2) {
          //??????
          //clearRect(x2, y2);
          return Math.sqrt(
            Math.pow(x2 * 1 - x1 * 1, 2) + Math.pow(y2 * 1 - y1 * 1, 2)
          );
        },
      };


      // Scroll
      var rulezH = new Rulez({
        element: document.getElementById("svgH"),
        layout: "horizontal",
        width: 360,
        height: 60,
        texts: [
          {
            pixelGap: 100,
            offset: 40,
          },
        ],
    divisions: [
      {
        pixelGap: 10,
        lineLength: 5
      },
      {
        pixelGap: 50,
        lineLength: 10
      },
      {
        pixelGap: 100,
        lineLength: 20
      }
  ],
        alignment: "bottom",
        textDefaults: {
          rotation: -90,
          centerText: true,
        },

      });
      rulezH.render();
      var rulezV = new Rulez({
        element: document.getElementById("svgV"),
        layout: "vertical",
        // units: 'mm',
        height: 550,
        alignment: "right",


    divisions: [
      {
        pixelGap: 10,
        lineLength: 5
      },
      {
        pixelGap: 50,
        lineLength: 10
      },
      {
        pixelGap: 100,
        lineLength: 20
      }
  ],
        textDefaults: {
          rotation: -90,
          centerText: {
            by: "height",
            operation: "sum", //'sum' or 'sub'
          },
        },
        texts: [
          {
            pixelGap: 100,
            offset: 30,
          },
        ],

      });
      rulezV.render();
      var scroll = document.getElementById("scroll");
      scroll.addEventListener("scroll", function () {
        rulezH.scrollTo(scroll.scrollLeft);
        rulezV.scrollTo(scroll.scrollTop);
      });


      document.getElementById("scroll").addEventListener("deltaY", function () {

        rulezH.saveAsImage(function (imgs) {
          img.src = imgs;
        });

        rulezH.resize();
        rulezV.resize();


      });
      var img = document.getElementById("img");
      var imgWidth = 0;
      var imgHeight = 0;
      var zoomLabel = document.getElementById("zoomLabel");

      document
        .getElementById("scroll")
        .addEventListener("wheel", function (event) {
                  canvas.clear()

          if (!imgWidth) {
            imgWidth = img.width;
            imgHeight = img.height;
          }
          if (event.deltaY > 0) {
            if (currentScale > 1) {currentScale = currentScale - 0.5;
            }
          } else if (event.deltaY < 0) {
            if(currentScale <=10){currentScale = currentScale + 0.5
            }

          }
          img.style.width = Math.round(imgWidth * currentScale) + "px";
          img.style.height = Math.round(imgHeight * currentScale) + "px";
          img.setAttribute('width',Math.round(imgWidth * currentScale))
          img.setAttribute('height',Math.round(imgHeight * currentScale))


          // ???????? ??????????????
          var upperCanvas = document.querySelector(".upper-canvas")
          upperCanvas.width = Math.round(imgWidth * currentScale )
          upperCanvas.height = Math.round(imgHeight * currentScale)
          upperCanvas.style.width = Math.round(imgWidth * currentScale) + "px";
          upperCanvas.style.height = Math.round(imgHeight * currentScale) + "px";


          canvas.width = Math.round(imgWidth * currentScale)
          canvas.height = Math.round(imgHeight * currentScale)


          console.log(currentScale)
          rulezH.setScale(1 / currentScale);
          rulezV.setScale(1 / currentScale);
                      document.querySelectorAll(".rulez-text").forEach(el=>el.innerHTML=((el.innerHTML/${pixNum})*${multiplier}).toFixed(1))

        });

document.querySelectorAll(".rulez-text").forEach(el=>el.innerHTML= ((el.innerHTML/${pixNum})*${multiplier}).toFixed(1))

        `}
          </script>
        </Helmet>
        <Modal.Header className="border-0 pb-0 align-items-start" closeButton>
          {/* <Modal.Title>
            <h3 className="mb-3">???????? {props.currentInfoAboutTest.number}</h3>
            <h4 className="m-0">?????????? {Number(props.index)}</h4>
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="d-flex pt-0 h-100">

          <Col >
            <div className="measurement">
              <div className="content">
                <div id="scroll"
                >
                  <ScrollContainer vertical={allowScrolling} horizontal={allowScrolling}>
                    {/* <div style={{ width: "394px", height: "559.59px" }} > */}
                    <div style={{ width: "521px", height: "782px" }} >

                      <div>
                        {/* <img id="img" src={props.srcOFImg}

                      /> */}
                        <canvas id="img" width={imageW} height={imageH} style={{ background: `url(${clickedImage!})`, backgroundSize: "cover" }} ></canvas>

                        {/* <canvas id="img" width={imageW} height={imageH} style={{ background: `url(http://${process.env.REACT_APP_SERVER_SEVERSTAL! + clickedImage!})`, backgroundSize: "cover" }} ></canvas> */}
                        {/* <canvas id="img" style={{ background: `url(http://${process.env.REACT_APP_SERVER_SEVERSTAL! + clickedImage!})`, backgroundSize: "cover" }} ></canvas> */}

                      </div>

                    </div>
                  </ScrollContainer>
                </div>
              </div>
              <div className="ruler-horizontal">
                <svg id="svgH" xmlns="http://www.w3.org/2000/svg"></svg>
              </div>
              <div className="ruler-vertical">
                <svg id="svgV" xmlns="http://www.w3.org/2000/svg"></svg>
              </div>
            </div>
          </Col>
          <Col md="4" className="d-flex flex-column justify-content-start pb-5 pt-5">
            <Row className="p-0 mb-5">
              <h3 className="p-0 mb-3">???????? {props.currentInfoAboutTest.protocol}</h3>
              <h4 className="p-0 m-0">?????????? {Number(props.index)}</h4>
            </Row>
            <Row className="p-0 mt-5">
              <div className="control-panel__lighting d-flex align-items-center justify-content-between p-0 mb-4">
                <span className="control-panel__label">
                  ???????????????? ??????????????????
                </span>
                <label className="custom-control material-switch" >
                  <input type="checkbox" className="material-switch-control-input"
                    id="draw-switch"
                    onChange={() => setAllowScrolling(prevValue => !prevValue)}

                  />
                  <span className="material-switch-control-indicator">
                  </span>
                </label>
              </div>
              <Button id="removeAllLines" variant="outline-primary " className='analysis-control-panel__shape p-3 m-0'>?????????????? ?????? ??????????????????</Button>

            </Row>

          </Col>
        </Modal.Body>

      </Modal>
    </>

  )
}

export default Detail