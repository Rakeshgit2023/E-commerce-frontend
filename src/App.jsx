import { BrowserRouter as Router } from "react-router-dom";
import ParentRoute from "./routes/ParentRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ParentRoute />
      <ToastContainer />
    </Router>
  );
};

export default App;
