import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Room from "./pages/Room";
import Background from "./components/Background";
import Local from "./pages/Local";
import Error from "./pages/Error";
import Online from "./pages/Online";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/local/:gameMode" element={<Local />} />
          <Route path="/online/:gameMode" element={<Online />} />
          <Route path="/error" element={<Error />} />
        </Routes>
        <Background />
        <ToastContainer />
      </Router>
    </>
  );
}
export default App;
