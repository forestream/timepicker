import { useEffect, useRef, useState } from "react";
import "./TimePicker.css";
import TimePickerScroll from "./TimePickerScroll";
import { TIMES } from "./constants/time-constants";
import TimePickerObserverRoot from "./TimePickerObserverRoot";

export default function TimePicker() {
	const [ampm, setAmpm] = useState("");
	const [hour, setHour] = useState("");
	const [minute, setMinute] = useState("");
	const [observees, setObservees] = useState<HTMLLIElement[]>([]);
	const ampmRef = useRef<HTMLLIElement[]>([]);
	const hoursRef = useRef<HTMLLIElement[]>([]);
	const minutesRef = useRef<HTMLLIElement[]>([]);
	const ampmRefPusher = (el: HTMLLIElement) => ampmRef.current.push(el);
	const hoursRefPusher = (el: HTMLLIElement) => hoursRef.current.push(el);
	const minutesRefPusher = (el: HTMLLIElement) => minutesRef.current.push(el);

	useEffect(() => {
		setObservees(() => [
			...ampmRef.current,
			...hoursRef.current,
			...minutesRef.current,
		]);
	}, []);

	const handler = {
		handleSetTimes(type: string, value: string) {
			type === "ampm" && setAmpm(value);
			type === "hours" && setHour(value);
			type === "minutes" && setMinute(value);
		},
	};

	return (
		<>
			<div className="time-picker__selected">
				<p className="time-picker__selected-time">{ampm}</p>
				<p className="time-picker__selected-time">{hour}</p>
				<p className="time-picker__selected-time">{minute}</p>
			</div>
			<div className="time-picker__selector">
				<TimePickerObserverRoot observees={observees} handler={handler}>
					<TimePickerScroll
						type="ampm"
						items={TIMES.ampm}
						refPusher={ampmRefPusher}
					/>
					<TimePickerScroll
						type="hours"
						items={TIMES.hours}
						refPusher={hoursRefPusher}
					/>
					<TimePickerScroll
						type="minutes"
						items={TIMES.minutes}
						refPusher={minutesRefPusher}
					/>
				</TimePickerObserverRoot>
			</div>
		</>
	);
}
