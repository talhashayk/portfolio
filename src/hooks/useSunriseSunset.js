import { useState, useEffect } from "react";
import { getSunriseSunset } from "../api/sunriseSunset";

export const useSunriseSunset = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async (latitude, longitude, timezone) => {
			try {
				const results = await getSunriseSunset(
					latitude,
					longitude,
					timezone
				);
				setData(results);
			} catch (error) {
				console.error(
					"Error fetching sunrise and sunset data:",
					error.message
				);
			} finally {
				setLoading(false);
			}
		};

		const getLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					const timezone =
						Intl.DateTimeFormat().resolvedOptions().timeZone;

					fetchData(latitude, longitude, timezone);
				},
				() => {
					console.warn(
						"User denied location access. Defaulting to London coordinates."
					);
					fetchData(51.5074, -0.1278, "Europe/London");
				}
			);
		};

		getLocation();
	}, []);

	return { data, loading };
};
