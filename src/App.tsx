import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./routes/Routing";
import { setNavigate } from "./utils/navigateHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate); 
  }, [navigate]);

  return (
    <>
      <ToastContainer autoClose={3000} position={"top-center"} hideProgressBar={true} />
      <Routing />
    </>
  );
};

export default App;
