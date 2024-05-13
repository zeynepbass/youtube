
import Home from "./pages/Home.jsx"
import {Route,Routes} from "react-router-dom"
import Layout from "./Layout/Header"
import Detay from "./Layout/Detay"
import Search from "./Layout/Search"
function App() {
  return (
    <>
     <Routes>
     <Route path="/" element={<Layout><Home/></Layout>} />
     <Route path="video/:id" element={<Layout><Detay/></Layout>} />
     <Route path="search/:keyword" element={<Layout><Search/></Layout>} />
     </Routes>
    </>
  );
}

export default App;
