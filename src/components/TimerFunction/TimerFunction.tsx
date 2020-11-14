import React, { useState, useEffect } from 'react';

export default function TimerFunction (){
    let timerID: any
    let[date, setDate] = useState(new Date())
    useEffect(() => {
        function tick(){
            setDate(new Date());   
        }

        timerID = setInterval(
        () => tick(), 1000);  

        return function cleanup(){
            clearInterval(timerID)
        }
    });

    return(
        <div>
            <h1>Il est actuellement {date.toLocaleTimeString()}</h1>
        </div>
    );
}
