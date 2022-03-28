import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  //-----------------Fetch Data State---------------
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  //-------------Form Value State-----------------
  const [emailValue, setEmailValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [countryName, setCountryName] = useState("");
  //---------------Show DropDown State-----------------
  const [showCountries, setShowCountries] = useState(false);
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);
  //---------------Data Fetched In localStorage-----------------
  const [contactData, setContactData] = useState("");
  //---------------------Alert------------------------
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showAlertHandle = () => setShowAlert(!showAlert);
  //---------------------Dropdown Handle (Custom Select)------------------------
  const showCountriesHandle = () => setShowCountries(!showCountries);
  const showStatesHandle = () => setShowStates(!showStates);
  const showCitiesHandle = () => setShowCities(!showCities);

  //----------------------Inputs Values Handle-------------------
  const emailChange = (e) => setEmailValue(e.target.value);
  const clickedCountry = (value) => setCountryValue(value);
  const getCountryName = (value) => setCountryName(value);
  const clickedState = (value) => setStateValue(value);
  const clickedCity = (value) => setCityValue(value);

  //-----------------------URLs-----------------------------
  const countriesURL = "https://countriesnow.space/api/v0.1/countries/flag/images";
  const statesURL = "https://countriesnow.space/api/v0.1/countries/states";
  const citiesURL = "https://countriesnow.space/api/v0.1/countries/cities";

  //I use RTK-Query for data fetching. Its easy and best caching tool for frontend
  //-----------------Fetch Countries Data---------------------------
  const fetchCountries = async (e) => {
    const res = await axios.get(countriesURL);
    setCountries(res.data.data);
  };

  //-------------------Fetch States Data---------------------------
  const fetchStates = async (e) => {
    if (countryValue === "") {
      setShowAlert(true);
      setShowStates(false);
      return setErrorMessage("Choose a country to continue");
    }
    const res = await axios.post(statesURL, {
      country: countryName ? countryName : setErrorMessage("Choose a country to continue"),
    });
    setStates(res.data.data.states);
  };

  //-------------------Fetch Cities Data--------------------------
  const fetchCities = async (e) => {
    if (stateValue === "") {
      setShowAlert(true);
      setShowCities(false);
      return setErrorMessage("Choose a city to continue");
    }
    const res = await axios.post(citiesURL, {
      country: countryName ? countryName : setErrorMessage("Choose a state to continue"),
    });
    setCities(res.data.data);
  };

  const getLocalStorageData = () => {
    const data = localStorage.getItem("allFormData");
    const contact = JSON.parse(data);
    setContactData(contact);
  };

  //----------------------Submit Data-------------------
  const submitData = (e) => {
    e.preventDefault();
    const allData = { emailValue, countryName, stateValue, cityValue };

    //--------------------Check if all form is filled---------------------
    if (emailValue === "" && countryValue === "" && stateValue === "" && cityValue === "") {
      setShowAlert(true);
      return setErrorMessage("Fill the appropriate details to continue");
    }
    if (emailValue === "" && !emailValue.includes("@")) {
      setShowAlert(true);
      return setErrorMessage("Enter a valid email");
    }
    if (countryValue === "") {
      setShowAlert(true);
      return setErrorMessage("Choose a country to continue");
    }
    if (stateValue === "") {
      setShowAlert(true);
      return setErrorMessage("Choose a state to continue");
    }
    if (cityValue === "") {
      setShowAlert(true);
      return setErrorMessage("Choose a city to continue");
    }
    //---------Store Data In Local Storage---------------------
    localStorage.setItem("allFormData", JSON.stringify(allData));

    //---------Empty All Vlue after submission---------------------
    setEmailValue("");
    setCountryValue("");
    setStateValue("");
    setCityValue("");
  };
  return (
    <MyContext.Provider
      value={{
        cities,
        clickedCity,
        clickedCountry,
        clickedState,
        contactData,
        countries,
        countryValue,
        countryName,
        cityValue,
        emailValue,
        emailChange,
        errorMessage,
        fetchCities,
        fetchCountries,
        fetchStates,
        getCountryName,
        getLocalStorageData,
        stateValue,
        showCountries,
        showStates,
        showCities,
        showAlert,
        showAlertHandle,
        showCountriesHandle,
        showStatesHandle,
        showCitiesHandle,
        states,
        submitData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
