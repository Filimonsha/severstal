import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Mousewheel, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ISegment, ITest } from '../../../types/interfaces';
import AnalysedSegment from './AnalysedSegment';
import "./ListOfAnalysedParts.css"
interface IProps {
    listOfDetails: ISegment[],
    setSwiper: any,
    setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
    currentInfoAboutTest: ITest,

}

const ListOfAnalysedParts = (props: IProps) => {
    useEffect(() => {
        console.log("пришедший массив сегментов", props.listOfDetails)

    }, [])
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
                        slidesPerView: 4,
                    },
                }}
                spaceBetween={24}
                modules={[Scrollbar, Mousewheel]}
                className="mySwiper"
            >
                {props.listOfDetails.map((currentSegment, index) => {
                    console.log("ЭЛЕМЕНТ LISTOFDETAILS", currentSegment, index)
                    // const currentArrayAnalysedImages: Array<object> = []
                    return (
                        <SwiperSlide>
                            <div className="detail__header text-start">
                                {"Часть " + (Number(index) + 1)}


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
                                        (currentImage, index) => {

                                            // const AnalysedSegment = lazy(() => import("./AnalysedSegment"))
                                            if (currentImage.light === "top") {
                                                return (
                                                    <SwiperSlide>
                                                        {/* <Suspense fallback={<h1>Загрузка</h1>}> */}
                                                        <AnalysedSegment setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} currentInfoAboutTest={props.currentInfoAboutTest} imageId={currentImage.id} />
                                                        {/* </Suspense> */}
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
        </div>
    )
}

export default ListOfAnalysedParts