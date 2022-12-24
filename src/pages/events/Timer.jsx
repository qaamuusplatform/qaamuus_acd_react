import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Timer({ date }) {
  const comingDate = new Date(date).getTime();
  const [timer, setTimer] = useState(comingDate);

  const calculateTimeLeft = (timer) => {
    let days = Math.floor(timer / (1000 * 60 * 60 * 24));

    let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timer % (1000 * 60)) / 1000);

    if (days < 10) days = "0" + days;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(comingDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = calculateTimeLeft(timer);

  if (
    parseInt(days) + parseInt(hours) + parseInt(minutes) + parseInt(seconds) <=
    0
  )
    return <>
    <p style={{ margin: "0px", fontWeight: 600 }}>Waa ka dhiman</p>
    <TimerStyle>
      <div className="days">
        <p>0</p>
        <h6>Days</h6>
      </div>
      <div className="hours">
        <p>0</p>
        <h6>Hours</h6>
      </div>
      <div className="minutes">
        <p>0</p>
        <h6>Minutes</h6>
      </div>
      <div className="seconds">
        <p>0</p>
        <h6>Seconds</h6>
      </div>
    </TimerStyle>
  </>;
  return (
    <>
      <p style={{ margin: "0px", fontWeight: 600 }}>Waa ka dhiman</p>
      <TimerStyle>
        <div className="days">
          <p>{days}</p>
          <h6>Days</h6>
        </div>
        <div className="hours">
          <p>{hours}</p>
          <h6>Hours</h6>
        </div>
        <div className="minutes">
          <p>{minutes}</p>
          <h6>Minutes</h6>
        </div>
        <div className="seconds">
          <p>{seconds}</p>
          <h6>Seconds</h6>
        </div>
      </TimerStyle>
    </>
  );
}

export default Timer;

const TimerStyle = styled.div`
  width: 28rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 650px) {
    width: 18rem;
  }

  div {
    background-color: #21acc3;
    width: 5rem;
    height: 4rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 0.2rem;
    @media (max-width: 650px) {
      padding: 0.3rem 0.4rem;
      width: 4rem;
      height: 3rem;
      margin: 0.5rem;
    }

    p {
      font-size: 1.6rem;
      font-weight: bold;
      @media (max-width: 650px) {
        font-size: 1rem;
        font-weight: normal;
      }
    }

    h6 {
      color: #fdd22f;
      @media (max-width: 650px) {
        font-size: 0.7rem;
      }
    }

    p,
    h6 {
      margin: 0%;
    }
  }
`;
