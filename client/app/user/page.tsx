"use client";
import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { io } from "socket.io-client";
interface timer {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  completed: boolean;
}
export default function Page() {
  const [connect, setConnection] = useState<any>(false);
  const timerRef: any = useRef();
  const [time, setTime] = useState({});
  const newSocket = io("http://localhost:8082");
  useEffect(() => {
    newSocket.on("connect", () => {
      newSocket.emit("register", {});
      setConnection(true);
      newSocket.on("start", () => {
        if (timerRef) {
          timerRef.current.start();
        }
      });
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);
  newSocket.on("disconnect", () => setConnection(false));
  const timer = Date.now() + 10001;
  const zeroPadTime = (value: number) => (value < 10 ? `0${value}` : value);
  const formatMS = (value: number) => (value < 100 ? `0${value}` : value);
  const renderer = ({ hours, minutes, seconds, milliseconds, completed }: timer) => {
    const formattedHours = zeroPadTime(hours);
    const formattedMinutes = zeroPadTime(minutes);
    const formattedSeconds = zeroPadTime(seconds);
    const formattedMilliseconds = formatMS(milliseconds);
    if (completed) {
      // Render a completed state
      return <h1>done</h1>;
    } else {
      // Render a countdown
      return (
        <div className="text-3xl flex flex-row gap-x-2">
          <p className="wrapper w-5">{formattedHours} </p> <div className="mx-5">:</div>
          <p className="wrapper w-5"> {formattedMinutes} </p> <div className="mx-5">:</div>
          <p className="wrapper w-5"> {formattedSeconds} </p> <div className="mx-5">:</div>
          <p className="wrapper w-5"> {formattedMilliseconds}</p>
        </div>
      );
    }
  };
  return (
    <div className="w-full h-full flex items-center">
      {!connect ? (
        <div>connecting...</div>
      ) : (
        <section className="w-full h-full gap-8 flex flex-col justify-center items-center">
          <Countdown onTick={(e) => setTime(e)} ref={timerRef} autoStart={false} date={timer} precision={3} intervalDelay={0} renderer={renderer} />

          <button
            onClick={() => {
              // newSocket.emit("event");
              timerRef.current.start();
            }}
            className="btn btn-primary"
          >
            stop
          </button>
        </section>
      )}
    </div>
  );
}
