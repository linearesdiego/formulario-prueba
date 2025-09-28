import { useEffect, useState } from "react";
import { getCities, getCountries, getStates } from "../services/api";

export const useLocations = (countryCode, stateCode) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // Estados de carga
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    // Estados de error
    const [errorCountries, setErrorCountries] = useState(null);
    const [errorStates, setErrorStates] = useState(null);
    const [errorCities, setErrorCities] = useState(null);

    useEffect(() => {
        const loadCountries = async () => {
            setLoadingCountries(true);
            setErrorCountries(null);
            try {
                const data = await getCountries();
                setCountries(data);
            } catch (error) {
                setErrorCountries('Error al cargar países');
                console.error('Error cargando países:', error);
            } finally {
                setLoadingCountries(false);
            }
        };

        loadCountries();
    }, []);

    useEffect(() => {
        const loadStates = async () => {
            if (countryCode) {
                setLoadingStates(true);
                setErrorStates(null);
                try {
                    const data = await getStates(countryCode);
                    setStates(data);
                } catch (error) {
                    setErrorStates('Error al cargar estados');
                    console.error('Error cargando estados:', error);
                } finally {
                    setLoadingStates(false);
                }
            } else {
                setStates([]);
                setErrorStates(null);
            }
        };

        loadStates();
    }, [countryCode]);

    useEffect(() => {
        const loadCities = async () => {
            if (countryCode && stateCode) {
                setLoadingCities(true);
                setErrorCities(null);
                try {
                    const data = await getCities(countryCode, stateCode);
                    setCities(data);
                } catch (error) {
                    setErrorCities('Error al cargar ciudades');
                    console.error('Error cargando ciudades:', error);
                } finally {
                    setLoadingCities(false);
                }
            } else {
                setCities([]);
                setErrorCities(null);
            }
        };

        loadCities();
    }, [countryCode, stateCode]);

    return {
        countries,
        states,
        cities,
        loadingCountries,
        loadingStates,
        loadingCities,
        errorCountries,
        errorStates,
        errorCities,
        isLoading: loadingCountries || loadingStates || loadingCities
    };
};
