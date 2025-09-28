import axios from "axios";

const API_URL = "https://api.countrystatecity.in/v1";
const API_KEY = "aVJqdFhFTU9CTVdrR21vTFk3eGFqaURPQXBPY2t0emFGeDBRdHMxOQ==";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-CSCAPI-KEY": API_KEY,
  },
});

export const getCountries = async () => {
  try {
    const res = await api.get("/countries");
    return res.data;
  } catch (error) {
    console.error("Error al obtener países:", error);
    return [];
  }
};

export const getStates = async (countryCode) => {
  if (!countryCode) return [];
  try {
    const res = await api.get(`/countries/${countryCode}/states`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener estados:", error);
    return [];
  }
};

export const getCities = async (countryCode, stateCode) => {
  if (!countryCode || !stateCode) return [];
  try {
    const res = await api.get(
      `/countries/${countryCode}/states/${stateCode}/cities`
    );
    return res.data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error);
    return [];
  }
};
