import { HiOutlinePencil } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useContext, useEffect } from "react";
import MyContext from "../store/MyContext";

const ContactList = () => {
  const { contactData, getLocalStorageData } = useContext(MyContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      getLocalStorageData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [getLocalStorageData]);
  return (
    <div className="contact_background">
      <h1 className="form_header">Contact list</h1>
      <div className="my-3 border-gray-100 border-b"></div>
      <div className="contact_data">
        <div>
          <p className="font-bold">Email</p>
          <p>{contactData?.emailValue}</p>
        </div>
        <div>
          <p className="font-bold">Country</p>
          <p>{contactData?.countryName}</p>
        </div>
        <div>
          <p className="font-bold">State</p>
          <p>{contactData?.stateValue}</p>
        </div>
        <div>
          <p className="font-bold">City</p>
          <div className="inline-flex space-x-2">
            <p>{contactData?.cityValue}</p>
            {contactData && (
              <div className="inline-flex m-2 mt-0 ml-8 space-x-4">
                <HiOutlinePencil />
                <FaTimes />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
