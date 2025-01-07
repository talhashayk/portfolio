import React, { useState, useEffect } from "react";
import { useSunriseSunset } from "../hooks/useSunriseSunset";
import TimeSlit from "./TimeSlit";

const TimeSlits = () => {
	const [hoverIndex, setHoverIndex] = useState(null);
	const { data: sunriseSunset, loading } = useSunriseSunset(51.5074, -0.1278);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const currentTime = new Date();
	const currentHour = currentTime.getHours();
	const currentMinutes = currentTime.getMinutes().toString().padStart(2, "0");
	const formattedTime = `${currentHour
		.toString()
		.padStart(2, "0")}:${currentMinutes}`;

	const toggleDarkMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	useEffect(() => {
		document.body.className = isDarkMode ? "dark-mode" : "light-mode";
	}, [isDarkMode]);

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
			setIsDarkMode(true);
		} else {
			setIsDarkMode(false);
		}
	}, [sunriseSunset, currentHour]);

	if (loading) {
		return <p>Loading...</p>;
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
			<div>
				<p>Sunrise: {sunriseSunset.sunrise}</p>
				<p>Sunset: {sunriseSunset.sunset}</p>
			</div>
			<div className="mode-identifier" onClick={toggleDarkMode}>
				<div className="mode-identifier-title">
					{isDarkMode ? (
						<img
							src="/moon.svg"
							alt="Moon Icon"
							className="annotation-icon"
						/>
					) : (
						<img
							src="/sun.svg"
							alt="Sun Icon"
							className="annotation-icon"
						/>
					)}
					theme
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
