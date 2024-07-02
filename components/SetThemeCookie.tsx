"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

const SetThemeCookie = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    Cookies.set("theme", theme, { expires: 30, path: "/" });
  }, []);

  return null;
};

export default SetThemeCookie;
