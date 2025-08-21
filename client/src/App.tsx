import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import AppContainer from "./pages/AppContainer";
import { setNavigate } from "./lib/navigation";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  setNavigate(navigate);

  // Manage theme
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
