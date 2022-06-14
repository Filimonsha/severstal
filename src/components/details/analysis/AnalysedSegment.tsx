import React, { useCallback, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import axiosInstance from '../../../helpers/axios'
import { IScore, ITest } from '../../../types/interfaces'
import "./AnalysedSegment.css"
interface IProps {
    // string было
    imageId: number,
    currentInfoAboutTest: ITest,
    setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
    isHistoryRoute: boolean
}
interface IDefect {
    name: string,
    ranges: Array<any>,
    score: number,
}

const AnalysedSegment = (props: IProps) => {
    const [imageAnalysed, setImageAnalysed] = useState(false)
    const [imageWithoutDefects, setImageWithoutDefects] = useState(true)
    const [wasAnalysed, setWasAnalysed] = useState(false)
    const [defectsScore, setDefectsScore] = useState<IScore>({
        ОР: 0,
        ОХН: 0
    })

    useEffect(() => {
        console.log("ИзрБРАЖЕНИЕ ПОМЕНЯЛОСЬ ", props.imageId)
        if (!props.isHistoryRoute) {
            analyseImage()

        }
    }, [props.imageId])
    const analyseImage = useCallback(() => {
        axiosInstance.post(`/api/imaging/image/${props.imageId}/analyze/`).then(res => {
            console.log("Анализировано изображение", res)
            setImageAnalysed(true)
            res.data.defects.forEach((defect: IDefect) => {
                if (defect.score !== 0) {
                    setImageWithoutDefects(false)
                }
                if (defect.name === "ОХН") {
                    setDefectsScore(prevDefectsScore => ({ ...prevDefectsScore, ОХН: defect.score }))
                } else if (defect.name = "ОР") {
                    setDefectsScore(prevDefectsScore => ({ ...prevDefectsScore, ОР: defect.score }))
                }
            });
            setWasAnalysed(true)
            console.log(wasAnalysed)
        })
    }, [props.imageId])

    const checkIsImageWithoutDefects = () => {
        // res.data.defects.forEach((defect: IDefect) => {
        //     if (defect.score !== 0) {
        //         setImageWithoutDefects(false)
        //     }
        //     if (defect.name === "ОХН") {
        //         setDefectsScore(prevDefectsScore => ({ ...prevDefectsScore, ОХН: defect.score }))
        //     } else if (defect.name = "ОР") {
        //         setDefectsScore(prevDefectsScore => ({ ...prevDefectsScore, ОР: defect.score }))
        //     }
        // });

    }
    return (
        <div className="analysed-segment">
            {
                props.isHistoryRoute ?
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

export default React.memo(AnalysedSegment)