import { useEffect, useState } from "react";

export default function usePremium() {
  const [premium, setPremium] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("premium") === "1") return true;
    return localStorage.getItem("premium") === "true";
  });

  useEffect(() => {
    const onStorage = () => setPremium(localStorage.getItem("premium") === "true");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const enable = () => {
    localStorage.setItem("premium", "true");
    setPremium(true);
  };
  const disable = () => {
    localStorage.removeItem("premium");
    setPremium(false);
  };

  return { premium, enable, disable };
}