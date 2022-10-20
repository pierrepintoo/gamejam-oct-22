import { useTimer } from "react-timer-and-stopwatch";

import './style.css'

const Time = () => {

    const timer = useTimer({
        create: {
            stopwatch: {}
        },
        includeMilliseconds: true,
        includeHours: false,
        intervalRate: 47
    });

    return (
        <section className="time">
            {timer.timerText.split(":")[1] + ":" + timer.timerText.split(":")[2] + ":" + timer.timerText.split(":")[3]}
        </section>
    )
}

export default Time