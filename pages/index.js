import Alert from "../components/Alert";
import ContactList from "../components/ContactList";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Layout from "../components/Layout";
import { MdKeyboardArrowUp } from "react-icons/md";
import MyContext from "../store/MyContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const {
    cities,
    clickedCity,
    clickedCountry,
    clickedState,
    countries,
    countryName,
    countryValue,
    cityValue,
    emailValue,
    emailChange,
    fetchCities,
    fetchCountries,
    fetchStates,
    getCountryName,
    stateValue,
    showCountries,
    showStates,
    showCities,
    showAlert,
    showCountriesHandle,
    showStatesHandle,
    showCitiesHandle,
    states,
    submitData,
  } = useContext(MyContext);

  return (
    <Layout>
      <div className="background_color">
        <div className="circle_one"></div>
        <div className="circle_two"></div>
        <div className="circle_three"></div>
        <div className="circle_four"></div>
        <div className="circle_five"></div>
        <div className="circle_six"></div>

        <div className="first_form_background ">
          <div className="form_background">
            <h1 className="form_header">Let's know you more</h1>
            <p className="form_description">Fill the appropriate details</p>
            <form onSubmit={submitData} className="form_style">
              <div className="justify-center space-y-4">
                {/*-------Email--------------*/}
                <input
                  className="style_input"
                  onChange={emailChange}
                  value={emailValue}
                  type="email"
                  placeholder="Email"
                />
                {/*-------Country--------------*/}
                <div
                  onClick={() => {
                    showCountriesHandle();
                    fetchCountries();
                  }}
                  className="drop_down"
                >
                  {countryValue ? (
                    <Image src={countryValue} alt="country" width={20} height={20} objectFit="fill" />
                  ) : (
                    <p className="opacity-30">Country</p>
                  )}

                  {showCountries === true ? <MdKeyboardArrowUp /> : <IoIosArrowDown />}
                </div>
                <div>
                  {showCountries === true && (
                    <div className="data_list">
                      {countries?.map((country, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            clickedCountry(country.flag);
                            getCountryName(country.name);
                            showCountriesHandle();
                          }}
                          className="flex justify-start p-2 space-x-6 text-sm cursor-pointer"
                        >
                          <Image src={country.flag} alt={country.name} width={20} height={20} objectFit="fill" />
                          <div key={i} className="flex-wrap hover:bg-teal-50 ">
                            <p className="text-gray-700 hover:bg-teal-50 ">{country.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/*-------State--------------*/}
                <div
                  onClick={() => {
                    showStatesHandle();
                    fetchStates();
                  }}
                  className="drop_down"
                >
                  {stateValue ? <p>{stateValue}</p> : <p className="opacity-30">State</p>}
                  {showStates === true ? <MdKeyboardArrowUp /> : <IoIosArrowDown />}{" "}
                </div>
                {showStates === true && (
                  <div className="data_list">
                    {states?.map((state, i) => (
                      <p
                        key={i}
                        onClick={() => {
                          clickedState(state.name);
                          showStatesHandle();
                        }}
                        className="drop_down_value"
                      >
                        {state.name}
                      </p>
                    ))}
                  </div>
                )}
                {/*-------City--------------*/}
                <div
                  onClick={() => {
                    showCitiesHandle();
                    fetchCities();
                  }}
                  className="drop_down"
                >
                  {cityValue ? <p>{cityValue}</p> : <p className="opacity-30">City/town</p>}
                  {showCities === true ? <MdKeyboardArrowUp /> : <IoIosArrowDown />}{" "}
                </div>
                {showCities === true && (
                  <div className="data_list">
                    {cities?.map((city, i) => (
                      <p
                        key={i}
                        onClick={() => {
                          clickedCity(city);
                          showCitiesHandle();
                        }}
                        className="drop_down_value"
                      >
                        {city}
                      </p>
                    ))}
                  </div>
                )}
                <div className="flex mt-16 justify-center">
                  <button className="submit_button">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <ContactList />
        </div>
      </div>
      {showAlert && <Alert />}
    </Layout>
  );
}
