import Ruler from "@scena/ruler";
import { useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Helmet } from "react-helmet";
import ScrollContainer from "react-indiana-drag-scroll";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./Detail.css"
import "./rulez-black.css"

interface IDetail {
  id: string, test: string,
  length: string,
  width: string,
  images: Array<any>,
}

interface IProps {
  detailInfo: IDetail,
  srcOFImg: string,
  index: number,
  setSwiper: any,
}


const aboba = [{}, {}, {}, {}, {}]


const Detail = (props: IProps) => {
  const [show, setShow] = useState(false)
  const [allowScrolling, setAllowScrolling] = useState(true)
  const [alert, setAlert] = useState(false)
  const [imageH, setImageH] = useState(559.59)

  const swiper = useSwiper()

  useEffect(() => {
    props.setSwiper(swiper)

  })
  useEffect(() => {

    console.log("я ебануттттый", props.detailInfo)
  }, [])

  useEffect(() => {


  }, [allowScrolling])
  return (
    <>

      <div className='detail'>
        <div className="detail__header text-start">
          {"Часть " + props.index}


        </div>
        <div className="detail__img d-flex" onClick={() => {
          setShow(true)


        }}>
          <Swiper
            scrollbar={{
              hide: false,
            }}
            nested
            mousewheel
            slidesPerView={3}
            modules={[Scrollbar, Mousewheel]}
            className=""
          >

            {
              props.detailInfo.images.map(el => {
                return (
                  <SwiperSlide>
                    <img src={`http://${process.env.REACT_APP_SERVER_SEVERSTAL}${el.file_crop}`} alt="" className="me-3" />
                  </SwiperSlide>
                )
              })
              // aboba.map(() => {
              //   return (
              //     <SwiperSlide>
              //       <img
              //         src={`http://${process.env.REACT_APP_SERVER_SEVERSTAL}/api/imaging/current_image/?offset=${20}`}
              //         alt="camera-img"
              //         className="detail__slider-image"
              //       // className="w-100 h-100"
              //       />
              //     </SwiperSlide>
              //   )
              // })
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

      var canvas = (this.__canvas = new fabric.Canvas("img", {
        hoverCursor: "pointer",
        selection: false,
      }));
      fabric.Object.prototype.transparentCorners = false;

      canvas.on("mouse:down", function (o) {
        if (trigger == "1") {
          isDown = true;
          var pointer = canvas.getPointer(o.e);
          canvas.width = 1000 
          console.log(canvas,"СУКАААА" )
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
          text = new fabric.Text("Length " + px, {
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
      var rulezH = new Rulez({
        element: document.getElementById("svgH"),
        layout: "horizontal",
        width: 441,
        height: 60,

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
        alignment: "right",
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
          if (!imgWidth) {
            imgWidth = img.width;
            imgHeight = img.height;
          }
          if (event.deltaY > 0) {
            if (currentScale > 1) {currentScale = currentScale - 0.2;
            lineScale = lineScale + 0.3
            
            }
            console.log(currentScale)
          } else if (event.deltaY < 0) {
            currentScale = currentScale + 0.2;
            if(lineScale - 0.3 > 0){
            lineScale = lineScale - 0.3
            // lineShift = lineShift / 2
            }
            console.log(currentScale)
          }
          // canvas.style.width
          
          console.log(canvas.style, "ААААААААААААААААААААААААААААААААААЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ")
          img.style.width = imgWidth * currentScale + "px";
          img.style.height = imgHeight * currentScale + "px";
          rulezH.setScale(1 / currentScale);
          rulezV.setScale(1 / currentScale);
        });


       
        `}
          </script>
        </Helmet>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="measurement">


            <div className="content">
              <div id="scroll"
              >
                <ScrollContainer vertical={allowScrolling} horizontal={allowScrolling}>
                  <div style={{ width: "394px", height: "559.59px" }} >
                    <div>
                      {/* <img id="img" src={props.srcOFImg}

                      /> */}
                      <canvas id="img" width={394} height={imageH} style={{ background: `url(${props.srcOFImg})`, backgroundSize: "cover" }} ></canvas>

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary " className='analysis-control-panel__shape m-0' onClick={() => setAllowScrolling(false)}>Рисовать</Button>

        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Detail