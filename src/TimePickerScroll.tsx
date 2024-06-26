import {
	MouseEventHandler,
	WheelEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import "./TImePickerScroll.css";
import { TIMES } from "./constants/time-constants";

interface TimePickerScrollProps {
	type: "ampm" | "hours" | "minutes";
	items: (string | number)[];
	refPusher: (el: HTMLLIElement) => number;
}

export default function TimePickerScroll({
	type,
	items,
	refPusher,
}: TimePickerScrollProps) {
	const ulRef = useRef<HTMLUListElement>(null);
	const [mouseDown, setMouseDown] = useState(false);

	const handleWheel: WheelEventHandler = (e) => {
		if (
			Math.abs(e.deltaY) >
			(e.currentTarget as HTMLElement).firstElementChild!.scrollHeight
		) {
			e.preventDefault();
			(e.currentTarget as HTMLUListElement).scrollTop +=
				e.deltaY > 0
					? (e.currentTarget as HTMLElement).firstElementChild!.scrollHeight
					: -(e.currentTarget as HTMLElement).firstElementChild!.scrollHeight;
		}
	};

	const handleMouseDown: MouseEventHandler = (e) => {
		if (!ulRef.current) return;
		setMouseDown(true);
		ulRef.current.classList.add("time-picker__scroll--no-snap");
	};

	const handleMouseMove: MouseEventHandler = (e) => {
		if (!mouseDown || !ulRef.current) return;
		e.preventDefault();
		ulRef.current.scrollTop -= e.movementY;
	};

	const handleMouseUp: MouseEventHandler = () => {
		if (!ulRef.current) return;
		setMouseDown(false);
		ulRef.current.classList.remove("time-picker__scroll--no-snap");
	};

	const handleClick: MouseEventHandler = (e) => {
		if (!ulRef.current) return;
		ulRef.current.scrollTop =
			TIMES[type].indexOf((e.target as HTMLElement).innerText) *
			(e.target as HTMLElement).clientHeight;
	};

	useEffect(() => {
		if (!ulRef.current) return;
		const el = ulRef.current;
		el.addEventListener(
			"wheel",
			handleWheel as unknown as EventListenerOrEventListenerObject
		);
	}, [ulRef]);

	useEffect(() => {
		if (!document.body) return;
		document.body.addEventListener(
			"mousemove",
			handleMouseMove as unknown as EventListenerOrEventListenerObject
		);
		document.body.addEventListener(
			"mouseup",
			handleMouseUp as unknown as EventListenerOrEventListenerObject
		);

		return () => {
			document.body.removeEventListener(
				"mousemove",
				handleMouseMove as unknown as EventListenerOrEventListenerObject
			);
			document.body.removeEventListener(
				"mouseup",
				handleMouseUp as unknown as EventListenerOrEventListenerObject
			);
		};
	}, [mouseDown]);

	return (
		<ul
			ref={ulRef}
			onMouseDown={handleMouseDown}
			className="time-picker__scroll"
		>
			{items.map((item) => (
				<li
					key={item}
					ref={refPusher}
					onClick={handleClick}
					className={`time-picker__scroll-item ${type}`}
				>
					{item}
				</li>
			))}
		</ul>
	);
}
