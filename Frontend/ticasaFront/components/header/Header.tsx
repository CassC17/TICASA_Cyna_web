import React, { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);

  useEffect(() => {
    const handleResize = (dims: { window: ScaledSize; screen: ScaledSize }) => {
      setIsMobile(dims.window.width < 768);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove?.();
    };
  }, []);

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}