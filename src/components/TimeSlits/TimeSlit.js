import React from "react";

import "./TimeSlits.scss";
import moonIcon from "../../assets/moon.svg";
import sunIcon from "../../assets/sun.svg";

const TimeSlit = ({
	index,
	currentHour,
	hoverIndex,
	setHoverIndex,
	formattedTime,
	toggleDarkMode,
	sunrise,
	sunset,
	isDarkMode,
}) => {
	const distanceFromHover =
		hoverIndex === null ? 0 : Math.abs(hoverIndex - index);

	const distanceFromCurrent = Math.abs(currentHour - index);

	const baseWidth =
		hoverIndex === null
			? Math.max(40, 65 - distanceFromCurrent * 10)
			: Math.max(40, 65 - distanceFromHover * 10);

	const slitOpacity =
		index === currentHour
			? 1
			: hoverIndex === null
			? Math.max(0.1, 1 - distanceFromCurrent * 0.2)
			: Math.max(0.1, 1 - distanceFromHover * 0.2);

	const handleClick = () => {
		if (isDarkMode && index >= sunrise && index < sunset) {
			toggleDarkMode();
		} else if (!isDarkMode && (index < sunrise || index >= sunset)) {
			toggleDarkMode();
		}
	};

	return (
		<div className="time-slit-container" key={index}>
			<div
				className="time-slit"
				style={{
					width: `${baseWidth}px`,
					opacity: slitOpacity,
				}}
				onMouseEnter={() => setHoverIndex(index)}
			></div>
			{((index === currentHour && hoverIndex === null) ||
				index === hoverIndex) && (
				<div className="time-annotation" onClick={handleClick}>
					{index >= sunrise && index < sunset ? (
						<img
							src={sunIcon}
							alt="Sun Icon"
							className={`annotation-icon ${
								isDarkMode ? "annotation-icon-animation" : ""
							}`}
						/>
					) : (
						<img
							src={moonIcon}
							alt="Moon Icon"
							className={`annotation-icon ${
								!isDarkMode ? "annotation-icon-animation" : ""
							}`}
						/>
					)}
					{index === currentHour
						? formattedTime
						: `${index.toString().padStart(2, "0")}:00`}
				</div>
			)}
		</div>
	);
};

export default TimeSlit;
