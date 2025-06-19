import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useRouter, Link } from "expo-router";
import useUserLogout from "../../hooks/useUserLogout";
import { useCart } from "../../contexts/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const router = useRouter();
  const { logoutUser, loading } = useUserLogout();
  const { toggleCart } = useCart();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchText)}`);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible((prev) => !prev);
  };

  return (
    <View className="flex-row justify-between items-center w-full h-[70px] px-5 bg-blue-500 z-50 relative">
      <Link href="/">
        <Image
          source={require("../../assets/logo-cyna.webp")}
          style={{ width: 100, height: 40, resizeMode: "contain" }}
        />
      </Link>

      <View className="flex-row items-center bg-black/50 border border-white rounded-full h-10 px-3 max-w-[250px]">
        <TextInput
          placeholder="Rechercher..."
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          className="flex-1 text-white"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Text className="text-white ml-2">🔍</Text>
        </TouchableOpacity>
      </View>


      <Link href="categories">
        <Text className="text-white font-bold mx-2">Catégories</Text>
      </Link>

      <Link href="contact">
        <Text className="text-white font-bold mx-2">Contact</Text>
      </Link>

      <Link href="about">
        <Text className="text-white font-bold mx-2">A propos de Cyna</Text>
      </Link>

      <Link href="product">
        <Text className="text-white font-bold mx-2">Produits</Text>
      </Link>

      <TouchableOpacity onPress={toggleProfileMenu}>
        <Image
          source={require("../../assets/user.png")}
          style={{ width: 35, height: 35, resizeMode: "contain", cursor: "pointer" }}
        />
      </TouchableOpacity>

      {isProfileMenuVisible && (
        <View className="absolute top-[70px] right-0 w-[180px] bg-purple-700 rounded-lg p-2.5 z-50">
          {!isAuthenticated ? (
            <>
              <Link href="auth/register">
                <Text className="text-white mb-2.5">Inscription</Text>
              </Link>
              <Link href="auth/login">
                <Text className="text-white mb-2.5">Connexion</Text>
              </Link>
            </>
          ) : (
            <>
              <Link href="orders/history">
                <Text className="text-white mb-2.5">Mes commandes</Text>
              </Link>
              <TouchableOpacity onPress={handleLogout} disabled={loading}>
                <Text className="text-white mb-2.5">Déconnexion</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      </View>
  );
}