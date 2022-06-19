import Ruler from "@scena/ruler";
import { useEffect, useRef, useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import { Helmet } from "react-helmet";
import ScrollContainer from "react-indiana-drag-scroll";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import axiosInstance from "../../helpers/axios";
import { IImages, ISegment, ITest } from "../../types/interfaces";
import DeleteSvg from "../assets/DeleteSvg";
import "./Detail.css"
import "./rulez-black.css"


interface IProps {
  detailInfo: ISegment,
  currentInfoAboutTest: ITest,
  srcOFImg: string,
  index: number,
  setSwiper: any,
  sideOfLighting: boolean,
}


const aboba = [{}, {}, {}, {}, {}]


const Detail = (props: IProps) => {
  const [show, setShow] = useState(false)
  const [allowScrolling, setAllowScrolling] = useState(true)
  const [alert, setAlert] = useState(false)
  const [currentScale, setCurrentScale] = useState(1)
  const [imageH, setImageH] = useState(559.59)
  const [imageW, setImageW] = useState(394)
  const [clickedImage, setClickedImage] = useState<string>("")
  const swiper = useSwiper()

  useEffect(() => {
    props.setSwiper(swiper)
  })

  useEffect(() => {
    console.log("Поменяли !")
  }, [allowScrolling])


  const handleDeleteImage = (el:IImages) => {
    console.log(el)
    // axiosInstance.delete()
  }
  return (
    <>

      <div className='detail'>
        <div className="detail__header text-start">
          {"Часть " + props.index}


        </div>
        <div className="detail__img d-flex" >
          <Swiper
            scrollbar={{
              hide: true,
            }}
            nested
            mousewheel
            slidesPerView={3}
            modules={[Scrollbar, Mousewheel]}
            className=""
          >

            {
              props.detailInfo.images.map(el => {
                console.log(el)
                if (props.sideOfLighting) {
                  if (el.light === "top") {
                    console.log("Покзываем фотки с top")
                    return (<SwiperSlide >
                      <img src={`${el.file_crop}`} alt="" className="me-3" onClick={() => {
                        setShow(true)
                        setClickedImage(el.file_crop)

                      }} />
                    </SwiperSlide>)
                  }
                } else if (!props.sideOfLighting) {
                  if (el.light === "front") {
                    console.log("Показываем фотки с front")
                    return (<SwiperSlide className="image-slide">
                      <svg className="image-slide__delete-image" onClick={event=>handleDeleteImage(el)} width="78" height="79" viewBox="0 0 78 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_5545_1167)">
                          <rect x="26.9998" y="15.0171" width="32" height="32.0339" rx="3" fill="white" />
                        </g>
                        <defs>
                          <filter id="filter0_d_5545_1167" x="-0.000244141" y="0.0170898" width="78" height="78.0337" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-4" dy="8" />
                            <feGaussianBlur stdDeviation="11.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5545_1167" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5545_1167" result="shape" />
                          </filter>
                        </defs>
                      </svg>

                      <img src={`${el.file_crop}`} alt="" className="me-3" onClick={() => {
                        setShow(true)
                        setClickedImage(el.file_crop)
                        setAllowScrolling(true)
                      }} />
                    </SwiperSlide>)
                  }
                }
              })

            }
          </Swiper>

        </div>
      </div>





      <Modal show={show} onHide={() => setShow(false)}>
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
                        console.log(e.target.value)

      })
      document.getElementById("removeAllLines").addEventListener("click",function (e){
        console.log(canvas)
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
          console.log("Бляяяя",switchRegime.value)
          isDown = true;
          var pointer = canvas.getPointer(o.e);
          canvas.width = 1000 
          console.log(pointer.x,pointer.y, "ЫЫЫЫЫЫЫЫЫ")
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
          // text = new fabric.Text("Length " + px, {
            text = new fabric.Text("Length " + px*(1/currentScale), {

            left: endx[temp],
            top: endy[temp],
            fontSize: 12,
          });
          canvas.add(text);
        }

        canvas.renderAll();
      });

      canvas.on("mouse:up", function (o) {
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
          //线长
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
        width: 441,
        height: 60,
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
        height: 480,
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
            offset: 20,
          },
        ],

      });
      rulezV.render();
      var scroll = document.getElementById("scroll");
      scroll.addEventListener("scroll", function () {
        console.log("SSSSSSSSSSSSSSS")
        rulezH.scrollTo(scroll.scrollLeft);
        rulezV.scrollTo(scroll.scrollTop);
      });


      document.getElementById("scroll").addEventListener("deltaY", function () {
                console.log("JJJJJJJ")

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
          if (!imgWidth) {
            imgWidth = img.width;
            imgHeight = img.height;
          }
          if (event.deltaY > 0) {
            if (currentScale > 1) {currentScale = currentScale - 0.2;
            // lineScale = lineScale + 0.3
            }
          } else if (event.deltaY < 0) {
            currentScale = currentScale + 0.2;
            // if(lineScale - 0.3 > 0){
            // lineScale = lineScale - 0.3
            // }
            console.log(currentScale)
          }          
          img.style.width = imgWidth * currentScale + "px";
          img.style.height = imgHeight * currentScale + "px";
          img.setAttribute('width',imgWidth * currentScale)
          img.setAttribute('height',imgHeight * currentScale)

          
          // Фикс канваса
          var upperCanvas = document.querySelector(".upper-canvas")
          upperCanvas.width = imgWidth * currentScale 
          upperCanvas.height = imgHeight * currentScale 
          upperCanvas.style.width = imgWidth * currentScale + "px";
          upperCanvas.style.height = imgHeight * currentScale + "px";


          console.log("Было",canvas.width,canvas.height)
          canvas.width = imgWidth * currentScale 
          canvas.height = imgHeight * currentScale 
          console.log("Стало",canvas.width,canvas.height)

      //                             console.log("Канвас перед изменением",canvas)

      //   canvas = (this.__canvas = new fabric.Canvas("img", {
      //   hoverCursor: "pointer",
      //   selection: false,
      // }));
      //         console.log("Канвас после изменением",canvas)


          rulezH.setScale(1 / currentScale);
          rulezV.setScale(1 / currentScale);
        });


       
        `}
          </script>
        </Helmet>
        <Modal.Header className="border-0 pb-0 align-items-start" closeButton>
          <Modal.Title>
            <h3 className="mb-3">Тест {props.currentInfoAboutTest.number}</h3>
            <h4 className="m-0">Часть {Number(props.index)}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">

          <Col >
            <div className="measurement">
              <div className="content">
                <div id="scroll"
                >
                  <ScrollContainer vertical={allowScrolling} horizontal={allowScrolling}>
                    <div style={{ width: "394px", height: "559.59px" }} >
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
          <Col md='3' className="d-flex flex-column justify-content-center">
            <div className="control-panel__lighting d-flex align-items-center justify-content-between mb-4">
              <span className="control-panel__label">
                Включить измерение
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
            <Button id="removeAllLines" variant="outline-primary " className='analysis-control-panel__shape p-3 m-0'>Удалить все измерения</Button>
          </Col>
        </Modal.Body>

      </Modal>
    </>

  )
}

export default Detail