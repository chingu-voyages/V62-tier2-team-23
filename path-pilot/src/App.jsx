import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import InputForm from "./pages/InputForm.jsx";

export default function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inputForm" element={<InputForm />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}