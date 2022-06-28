import React, { useCallback, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import Swiper from 'swiper'
import { useSwiper } from 'swiper/react'
import axiosInstance from '../../../helpers/axios'
import { IScore, ITest } from '../../../types/interfaces'
import "./AnalysedSegment.css"
interface IProps {
    // setSwiper: React.Dispatch<React.SetStateAction<any>>,
    // string было
    // imageId: number,
    imageIndex: number,
    segmentIndex: number,
    currentInfoAboutTest: ITest,
    setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
    imageWasAnalysed: boolean
}
interface IDefect {
    name: string,
    ranges: Array<any>,
    score: number,
}

const AnalysedSegment = (props: IProps) => {
    const [imageAnalysed, setImageAnalysed] = useState(false)
    const [imageWithoutDefects, setImageWithoutDefects] = useState(true)
    const [defectsScore, setDefectsScore] = useState<IScore>({
        ОР: 0,
        ОХН: 0
    })

    useEffect(() => {
        props.currentInfoAboutTest.segments[props.segmentIndex].images[props.imageIndex].defects.forEach((defect: IDefect) => {
            if (defect.score !== 0) {
                setImageWithoutDefects(false)
            }
            if (defect.name === "ОХН") {
                setDefectsScore(prevDefectsScore => ({ ...prevDefectsScore, ОХН: defect.score }))
            } else if (defect.name = "ОР") {
                setDefectsScore(prevDefectsScore => ({ ...prevDefectsScore, ОР: defect.score }))
            }
        })
        // }
    }, [props.currentInfoAboutTest])

    return (
        <div className="analysed-segment">
            {
                props.imageWasAnalysed ?
                    <div className="analysed-segment__succ">
                        <div className="analysed-segment__square mb-3">
                        </div>
                        {imageWithoutDefects ?
                            <div className="analysed-segment__without-def">

                            </div> :
                            <div className="analysed-segment__with-def">
                                <span className="analysed-segment__OX mb-3">
                                    ОP {defectsScore.ОР}
                                </span>
                                <span className="analysed-segment__OXN">
                                    ОХН {defectsScore.ОХН}
                                </span>
                            </div>
                        }
                    </div>
                    : <>
                        {
                            imageAnalysed ?
                                <div className="analysed-segment__succ">
                                    <div className="analysed-segment__square mb-3">

                                    </div>
                                    {imageWithoutDefects ?
                                        <div className="analysed-segment__without-def">

                                        </div> :
                                        <div className="analysed-segment__with-def">
                                            <span className="analysed-segment__OX mb-3">
                                                ОХ {defectsScore.ОР}
                                            </span>
                                            <span className="analysed-segment__OXN">
                                                ОХН {defectsScore.ОХН}
                                            </span>
                                        </div>
                                    }
                                </div>
                                :
                                <div className="analysed-segment__wait">
                                    <Spinner animation='border' className='mb-3' />
                                    <div className="analysed-segment__gray">

                                    </div>
                                </div>
                        }
                    </>
            }

        </div>
    )
}

export default AnalysedSegment