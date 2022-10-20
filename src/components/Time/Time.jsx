import { useEffect, useState } from "react";
import { useTimer } from "react-timer-and-stopwatch";

import './style.css'

const Time = ({onHit}) => {
    const [isPenalityVisible, setIsPenalityVisible] = useState(false)

    useEffect(() => {
        addTime({seconds: 10})
        setIsPenalityVisible(true)

        setTimeout(() => {
            setIsPenalityVisible(false)
        }, 3000)
  
    }, [onHit])

    const timer = useTimer({
        create: {
            stopwatch: {}
        },
        includeMilliseconds: true,
        includeHours: false,
        intervalRate: 47
    });

    const {addTime} = timer

    return (
        <section className="time">
            <div className="time__top">
                {timer.timerText.split(":")[1] + ":" + timer.timerText.split(":")[2] + ":" + timer.timerText.split(":")[3]}
            </div>
            <div className={isPenalityVisible ? "time__add time__add--show" : "time__add"}>
                + 10s
            </div>
        </section>
    )
}

export default Time