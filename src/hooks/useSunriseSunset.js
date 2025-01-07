import { useState, useEffect } from "react";
import { getSunriseSunset } from "../api/sunriseSunset";

export const useSunriseSunset = (latitude, longitude) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const results = await getSunriseSunset(latitude, longitude);
			setData(results);
			setLoading(false);
		};

		fetchData();
	}, [latitude, longitude]);

	return { data, loading };
};
