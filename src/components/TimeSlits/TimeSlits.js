import React, { useState, useEffect } from "react";

import "./TimeSlits.scss";
import moonIcon from "../../assets/moon.svg";
import sunIcon from "../../assets/sun.svg";
import { useSunriseSunset } from "../../hooks/useSunriseSunset";
import TimeSlit from "./TimeSlit";

const TimeSlits = ({ isDarkMode, toggleDarkMode }) => {
	const [hoverIndex, setHoverIndex] = useState(null);
	const { data: sunriseSunset, loading } = useSunriseSunset();

	const currentTime = new Date();
	const currentHour = currentTime.getHours();
	const currentMinutes = currentTime.getMinutes().toString().padStart(2, "0");
	const formattedTime = `${currentHour
		.toString()
		.padStart(2, "0")}:${currentMinutes}`;

	const getSunriseSunsetHours = (sunriseSunsetTime) => {
		if (!sunriseSunsetTime) return null;
		let hour = Number(sunriseSunsetTime.split(":")[0]);
		let ampm = sunriseSunsetTime.split(" ")[1];
		return ampm === "PM" ? hour + 12 : hour;
	};

	useEffect(() => {
		if (!sunriseSunset) return;
		const sunriseHour = getSunriseSunsetHours(sunriseSunset.sunrise);
		const sunsetHour = getSunriseSunsetHours(sunriseSunset.sunset);

		if (currentHour < sunriseHour || currentHour >= sunsetHour) {
			toggleDarkMode();
		}
	}, [sunriseSunset, currentHour]);

	if (loading) {
		return (
			<div className="loader-container">
				<span className="loader"></span>
			</div>
		);
	}

	if (!sunriseSunset || !sunriseSunset.sunrise || !sunriseSunset.sunset) {
		return <p>Sunrise and sunset times could not be loaded.</p>;
	}

	const slits = Array.from({ length: 24 }, (_, index) => (
		<TimeSlit
			key={index}
			index={index}
			currentHour={currentHour}
			hoverIndex={hoverIndex}
			setHoverIndex={setHoverIndex}
			formattedTime={formattedTime}
			toggleDarkMode={toggleDarkMode}
			sunrise={getSunriseSunsetHours(sunriseSunset.sunrise)}
			sunset={getSunriseSunsetHours(sunriseSunset.sunset)}
			isDarkMode={isDarkMode}
		/>
	));

	return (
		<div
			className="time-slits-container"
			onMouseLeave={() => setHoverIndex(null)}
		>
			<div className="mode-identifier" onClick={toggleDarkMode}>
				<div className="mode-identifier-title">
					{isDarkMode ? (
						<img
							src={moonIcon}
							alt="Moon Icon"
							className="annotation-icon"
						/>
					) : (
						<img
							src={sunIcon}
							alt="Sun Icon"
							className="annotation-icon"
						/>
					)}
					<p className="theme-identifier-text">Theme</p>
				</div>
				<p className="mode-identifier-text">
					Select an hour with a different theme to toggle between
					light and dark mode
				</p>
				<p className="mode-identifier-text">
					(or click here for a less fun / better UX option)
				</p>
			</div>
			{slits}
		</div>
	);
};

export default TimeSlits;
