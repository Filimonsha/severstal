import Ruler from "@scena/ruler";
import { useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Helmet } from "react-helmet";
import ScrollContainer from "react-indiana-drag-scroll";
import { useSwiper } from "swiper/react";
import "./Detail.css"
import "./rulez-black.css"


interface IProps {
  srcOFImg: string,
  index: number,
  setSwiper: any,
}




const Detail = (props: IProps) => {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState("1")
  const [allowScrolling, setAllowScrolling] = useState(true)
  let position = {
    top: 0, left: 0, x: 0, y: 0
  }
  // const draggbleElem = document.getElementById('img');
  // console.log(draggbleElem)
  const swiper = useSwiper()

  // const draggbleElem = useRef(null)



  useEffect(() => {
    props.setSwiper(swiper)

  })


  return (
    <>

      <div className='detail'>
        <div className="detail__header text-start">
          {"Часть " + props.index}


        </div>
        <div className="detail__img" onClick={() => {
          setShow(true)


        }}>
          <img src={props.srcOFImg} alt="Изображение детали" />
        </div>
      </div>





      <Modal show={show} onHide={() => setShow(false)}>
        <Helmet>
          <script>
            {`
        var currentScale = 1;
      var initialScale = 1;
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
            // let scale = currentScale + 0.2;
            if (currentScale > 1) {currentScale = currentScale - 0.2;}
          } else if (event.deltaY < 0) {
            currentScale = currentScale + 0.2;

            console.log(currentScale);
          }

          img.style.width = imgWidth * currentScale + "px";
          img.style.height = imgHeight * currentScale + "px";
          rulezH.setScale(1 / currentScale);
          rulezV.setScale(1 / currentScale);
        });


        // Canvas
        
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
                      <img id="img" src={props.srcOFImg}

                      />
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