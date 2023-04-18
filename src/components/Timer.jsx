import React, { useState, useEffect } from "react";
import { getPadTime } from "../helpers/getPadTime";

export const Timer = () => {
	const [minutesInput, setMinutesInput] = useState(0);
	const [secondsInput, setSecondsInput] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [isCounting, setIsCounting] = useState(false);
	const [isEnable, setIsEnable] = useState(true);

	const minutes = getPadTime(Math.floor(timeLeft / 60));
	const seconds = getPadTime(Math.floor(timeLeft - minutes * 60));

	useEffect(() => {
		setTimeLeft(minutesInput * 60 + secondsInput);
	}, [minutesInput, secondsInput]);

	useEffect(() => {
		const interval = setInterval(() => {
			isCounting &&
				setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [isCounting]);

	const start = () => {
		setIsCounting(true);
		setIsEnable(false);
	};

	const pause = () => {
		setIsCounting(false);
		setIsEnable(false);
	};

	const reset = () => {
		setIsCounting(false);
		setIsEnable(true);
		setTimeLeft(0);
	};

	return (
		<div>
			<div className="container">
				<input
					disabled={!isEnable}
					onChange={(event) => setMinutesInput(+event.target.value)}
					value={minutes}
				/>
				<h2>:</h2>
				<input
					disabled={!isEnable}
					onChange={(event) => setSecondsInput(+event.target.value)}
					value={seconds}
				/>
			</div>
			<div className="buttons">
				{isCounting ? (
					<button onClick={pause}>Pause</button> 
				) : (
					<button onClick={start}>Start</button>
				)}
				{isCounting && <button onClick={reset}>Reset</button>}
			</div>
		</div>
	);
};
