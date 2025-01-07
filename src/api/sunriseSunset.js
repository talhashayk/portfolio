import axios from "axios";

const BASE_URL = "https://api.sunrisesunset.io/json";

export const getSunriseSunset = async (latitude, longitude) => {
	try {
		const response = await axios.get(BASE_URL, {
			params: {
				lat: latitude,
				lng: longitude,
				timezone: "Europe/London",
			},
		});
		return response.data.results;
	} catch (error) {
		console.error("Error fetching sunrise and sunset data:", error.message);
		return null;
	}
};
