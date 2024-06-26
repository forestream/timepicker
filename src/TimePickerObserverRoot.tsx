import "./TimePickerObserverRoot.css";
import { PropsWithChildren, useEffect } from "react";

interface TimePickerObserverRootProps {
	observees: HTMLLIElement[];
	handler: { [key: string]: (type: string, value: string) => void };
}

export default function TimePickerObserverRoot({
	children,
	observees,
	handler,
}: PropsWithChildren<TimePickerObserverRootProps>) {
	useEffect(() => {
		const observerCallback: IntersectionObserverCallback = (observerEntries) =>
			observerEntries.forEach((entry) => {
				if (entry.target.classList.contains("ampm") && entry.isIntersecting)
					handler.handleSetTimes("ampm", entry.target.innerHTML);
				if (entry.target.classList.contains("hours") && entry.isIntersecting)
					handler.handleSetTimes("hours", entry.target.innerHTML);
				if (entry.target.classList.contains("minutes") && entry.isIntersecting)
					handler.handleSetTimes("minutes", entry.target.innerHTML);
			});

		const observerOptions = {
			root: document.querySelector(".time-picker__observer-root"),
			threshold: 0.5,
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		observees.forEach((observee) => observer.observe(observee));

		return () => {
			observer.disconnect();
		};
	}, [observees]);

	return <div className="time-picker__observer-root">{children}</div>;
}
