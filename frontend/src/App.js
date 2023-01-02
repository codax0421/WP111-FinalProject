import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/home";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";
import ProductPage from "./pages/product";
import RegisterPage from "./pages/register";
import PrimarySearchAppBar from "./component/searchbar";
import AddProductPage from "./pages/addProduct";
import SearchPage from "./pages/search";
function App() {
  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/addArt" element={<AddProductPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
