import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Mousewheel, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import axiosInstance from '../../../helpers/axios';
import { ISegment, ITest } from '../../../types/interfaces';
import AnalysedSegment from './AnalysedSegment';
import "./ListOfAnalysedParts.css"
import NewAnalyseSegment from './NewAnalyseSegment';
interface IProps {
    // listOfDetails: ISegment[],
    setSwiper: any,
    setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
    currentInfoAboutTest: ITest,
    isHistoryRoute: boolean,
}

const ListOfAnalysedParts = (props: IProps) => {
    const copyOfTest = Object.assign({}, props.currentInfoAboutTest)
    const [analsedParts, setAnalysedParts] = useState(copyOfTest.segments)
    const [fOneOfNeedToAnalyse, setFOneOfNeedToAnalyse] = useState(false)
    useEffect(() => {
        analyseImages()

    }, [])
    const analyseImages = async () => {
        console.log(props.currentInfoAboutTest.segments)
        let fImagesNeedToAnalyse
        for (const [segmentIndex, segmentValue] of Array.from(props.currentInfoAboutTest.segments.entries())) {
            for (const [imageIndex, imageValue] of Array.from(segmentValue.images.entries())) {
                if (imageValue.needToAnylyse === true) {
                    fImagesNeedToAnalyse = true
                    props.setCurrentInfoAboutTest(prevInfo => ({ ...prevInfo, stillAnalysing: true }))
                    setFOneOfNeedToAnalyse(true)
                    console.log("Этому изобжраение надо анализ", imageValue)
                    const resOfAnalyseImage = await axiosInstance.post(`/api/imaging/image/${imageValue.id}/analyze/`)
                    const updateTest = await axiosInstance.get(`/api/imaging/test/${props.currentInfoAboutTest.id}/`)
                    console.log("Обновляем тест", updateTest.data)
                    props.setCurrentInfoAboutTest(updateTest.data)

                    console.log("Изображение проанализировалось", resOfAnalyseImage.data)
                    // Вытсавляем флаг анализировано у изображения
                    let copyOfAnalsedParts = analsedParts.slice(0)
                    copyOfAnalsedParts[segmentIndex].images[imageIndex].needToAnylyse = false
                    setAnalysedParts(copyOfAnalsedParts)
                }

            }
        }
        console.log("Все было проанализировано!")
        if (fImagesNeedToAnalyse) {
            console.log("Обновляем тест!")
            props.setCurrentInfoAboutTest(prevInfo => ({ ...prevInfo, stillAnalysing: true }))

            // axiosInstance.get(`/api/imaging/test/${props.currentInfoAboutTest.id}/`).then(res => props.setCurrentInfoAboutTest(res.data))
        }

    }
    return (
        <div className="list-of-details p-4">
            <h2 className="list-of-details__title mb-3 text-start">
                Анализ
            </h2>
            <Swiper
                // scrollbar={{
                //     hide: false,
                //     draggable: true,
                // }}
                // slidesPerView={"auto"}

                // mousewheel

                // spaceBetween={24}
                // modules={[Scrollbar, Mousewheel]}
                // className="mySwiper"
                scrollbar={{
                    hide: false,
                    draggable: true,
                }}
                mousewheel
                draggable
                // slidesPerView={1}
                slidesPerView={"auto"}
                // slidesPerView={1.5}
                spaceBetween={24}
                modules={[Scrollbar, Mousewheel]}
                className="mySwiper"
                onSwiper={(swiper) => {
                    props.setSwiper(swiper)
                }}

            >
                {
                    !fOneOfNeedToAnalyse ?
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
                                        // slidesPerView={4}
                                        slidesPerView={"auto"}

                                        // breakpoints={{
                                        //     900: {
                                        //         slidesPerView: 2,
                                        //     },
                                        //     1680: {
                                        //         slidesPerView: 4,
                                        //     },
                                        // }}
                                        spaceBetween={10}
                                        modules={[Scrollbar, Mousewheel]}
                                        className="nestedSwiper_analysed"
                                        nested
                                    >


                                        {
                                            currentSegment.images.map(
                                                (currentImage, imageIndex) => {
                                                    // if (currentImage.light === "top") {
                                                    return (
                                                        <SwiperSlide>
                                                            <AnalysedSegment imageIndex={imageIndex} segmentIndex={segmentIndex} imageWasAnalysed={!props.currentInfoAboutTest.date ? false : true} setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} currentInfoAboutTest={props.currentInfoAboutTest} />
                                                        </SwiperSlide>
                                                    )
                                                    // }

                                                }
                                            )
                                        }

                                    </Swiper>
                                </SwiperSlide>
                            );
                        })
                        :
                        // Если не анализировано
                        analsedParts.map((currentSegment, segmentIndex) => {

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
                                                    // if (currentImage.light === "top") {
                                                    return (
                                                        <SwiperSlide>
                                                            <NewAnalyseSegment imageIndex={imageIndex} segmentIndex={segmentIndex} needToAnalyse={currentImage.needToAnylyse} setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} currentInfoAboutTest={props.currentInfoAboutTest} />
                                                        </SwiperSlide>
                                                    )
                                                    // }

                                                }
                                            )
                                        }

                                    </Swiper>
                                </SwiperSlide>
                            );
                        })
                }

            </Swiper>
        </div >
    )
}

export default ListOfAnalysedParts