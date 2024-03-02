import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import SignUpPage from "../Pages/SignupPage.jsx";
import LogInPage from "../Pages/LoginPage.jsx";
import ProfilePage from "../Pages/ProfilePage.jsx";
import FilePage from "../Pages/FilePage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/signup" element={<SignUpPage />}></Route>
                <Route path="/login" element={<LogInPage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/file" element={<FilePage />}></Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
