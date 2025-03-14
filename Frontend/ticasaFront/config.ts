import { Platform } from "react-native";

export const getApiUrl = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000"; // Android Emulator
  }
  return "http://localhost:3000"; // Web et iOS
};
