import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Mousewheel, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ISegment, ITest } from '../../../types/interfaces';
import AnalysedSegment from './AnalysedSegment';
import "./ListOfAnalysedParts.css"
interface IProps {
    // listOfDetails: ISegment[],
    setSwiper: any,
    setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
    currentInfoAboutTest: ITest,
    isHistoryRoute: boolean,
}

const ListOfAnalysedParts = (props: IProps) => {
    return (
        <div className="list-of-details p-4">
            <h2 className="list-of-details__title mb-3 text-start">
                Анализ
            </h2>
            <Swiper
                scrollbar={{
                    hide: false,
                }}
                slidesPerView={1}
                mousewheel
                breakpoints={{
                    900: {
                        slidesPerView: 2,
                    },
                    1680: {
                        slidesPerView: 3,
                    },
                }}
                spaceBetween={24}
                modules={[Scrollbar, Mousewheel]}
                className="mySwiper"
                onSwiper={(swiper) => {
                    props.setSwiper(swiper)
                }}

            >
                {

                    props.currentInfoAboutTest.segments.map((currentSegment, segmentIndex) => {

                        return (
                            <SwiperSlide>
                                <div className="detail__header text-start">
                                    {"Часть " + (Number(segmentIndex) + 1)}


                                </div>
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
                                    spaceBetween={10}
                                    modules={[Scrollbar]}
                                    className="nestedSwiper_analysed"
                                    nested
                                >


                                    {
                                        currentSegment.images.map(
                                            (currentImage, imageIndex) => {
                                                if (currentImage.light === "top") {
                                                    return (
                                                        <SwiperSlide>
                                                            <AnalysedSegment imageIndex={imageIndex} segmentIndex={segmentIndex} setSwiper={props.setSwiper} imageWasAnalysed={!props.currentInfoAboutTest.date ? false : true} setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} currentInfoAboutTest={props.currentInfoAboutTest} imageId={currentImage.id} />
                                                        </SwiperSlide>
                                                    )
                                                }


                                            }
                                        )
                                    }

                                </Swiper>
                            </SwiperSlide>
                        );
                    })}

            </Swiper>
        </div >
    )
}

export default ListOfAnalysedParts