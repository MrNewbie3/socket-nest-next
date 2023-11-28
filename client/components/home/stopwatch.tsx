"use client";
import React, { useRef, useState } from "react";
import { io } from "socket.io-client";
import Countdown from "react-countdown";
interface timer {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  completed: boolean;
}
export default function Stopwatch() {
  const socket = io("http://localhost:8082");
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState([]);
  const timerRef0: any = useRef();
  const timerRef1: any = useRef();
  const timerRef2: any = useRef();
  const timerRef3: any = useRef();
  const timerRef4: any = useRef();
  const time = Date.now() + 10001;
  const refList = [timerRef0, timerRef1, timerRef2, timerRef3, timerRef4];
  socket.on("connectedUser", (e) => {
    setUser(e.data);
  });
  socket.on("stop", () => {});
  socket.on("connect", () => {
    setConnected(true);
  });
  socket.on("disconnect", () => {
    setConnected(false);
  });
  socket.on("start", () => {
    for (let index = 0; index <= user.length; index++) {
      refList[index].current.start();
    }
  });
  // window.addEventListener("keydown", (e) => {
  //   if ((e.ctrlKey && e.key == "r") || e.key == "F5") {
  //     e.preventDefault();
  //   }
  // });
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
          <div className="wrapper w-5">{formattedHours} </div> <div className="mx-5">:</div>
          <div className="wrapper w-5"> {formattedMinutes} </div> <div className="mx-5">:</div>
          <div className="wrapper w-5"> {formattedSeconds} </div> <div className="mx-5">:</div>
          <div className="wrapper w-5"> {formattedMilliseconds}</div>
        </div>
      );
    }
  };
  return (
    <div className="w-full h-full">
      {connected ? (
        <div className="flex flex-col w-full h-full gap-10 justify-center items-center">
          <Countdown ref={timerRef0} autoStart={false} date={time} precision={3} intervalDelay={0} renderer={renderer} />
          {user.length > 0 ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                socket.emit("start");
              }}
            >
              Start
            </button>
          ) : (
            <button className="btn btn-disabled" disabled>
              Start
            </button>
          )}
          <div className="w-full flex flex-row justify-evenly">
            {user.map((e, i) => {
              return <Countdown ref={refList[i + 1]} key={i} autoStart={false} date={time} precision={3} intervalDelay={0} renderer={renderer} />;
            })}
          </div>
        </div>
      ) : (
        <div>connecting...</div>
      )}
    </div>
  );
}
