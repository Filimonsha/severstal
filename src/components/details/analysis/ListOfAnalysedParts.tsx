import React from 'react'
import { Mousewheel, Scrollbar } from 'swiper';
import { Swiper,SwiperSlide } from 'swiper/react';
interface IProps {
    listOfDetails: object[],
    setSwiper: any,
}

const ListOfAnalysedParts = (props:IProps) => {
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
              {props.listOfDetails.map((el, index) => {
                  return (
                      <SwiperSlide>
                          Эаааааададад
                      </SwiperSlide>
                  );
              })}

          </Swiper>
      </div>
  )
}

export default ListOfAnalysedParts