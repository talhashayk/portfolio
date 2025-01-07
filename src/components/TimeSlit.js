import React from "react";

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
							src="/sun.svg"
							alt="Sun Icon"
							data-tip="You're already in light mode. Click the moon icon to switch to dark mode."
							className={`annotation-icon ${
								isDarkMode ? "annotation-icon-animation" : ""
							}`}
						/>
					) : (
						<img
							src="/moon.svg"
							alt="Moon Icon"
							data-tip="You're already in light mode. Click the moon icon to switch to dark mode."
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
