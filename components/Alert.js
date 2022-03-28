import { useContext } from "react";
import MyContext from "../store/MyContext";

function Alert() {
  const { errorMessage, showAlertHandle } = useContext(MyContext);

  return (
    <div className="mx-0 jsutify-center ">
      <div onClick={showAlertHandle} className="absolute inset-0 z-20 bg-gray-900 bg-opacity-70"></div>
      <div className="alert_background">
        <h2 className="font-bold leading-7">Alert</h2>
        <p className="text-red-500 ">{errorMessage}</p>
        <p onClick={showAlertHandle}>ok</p>
      </div>
    </div>
  );
}

export default Alert;
