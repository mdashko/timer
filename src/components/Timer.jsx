import React, { useState, useEffect } from "react";
import { getPadTime } from "../helpers/getPadTime";

export const Timer = () => {
	const [minutesInput, setMinutesInput] = useState(0);
	const [secondsInput, setSecondsInput] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [isCounting, setIsCounting] = useState(false);

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
	};

	const pause = () => {
		setIsCounting(false);
	};

	const reset = () => {
		setIsCounting(false);
		setTimeLeft(0);
	};

	return (
		<div>
			<h1>
				{minutes}:{seconds}
			</h1>
			<div>
				<p>minutes:</p>
				<input onChange={(event) => setMinutesInput(+event.target.value)} />
				<p>seconds:</p>
				<input onChange={(event) => setSecondsInput(+event.target.value)} />
			</div>
			{isCounting ? (
				<button onClick={pause}>Pause</button>
			) : (
				<button onClick={start}>Start</button>
			)}
			<button onClick={reset}>Reset</button>
		</div>
	);
};
