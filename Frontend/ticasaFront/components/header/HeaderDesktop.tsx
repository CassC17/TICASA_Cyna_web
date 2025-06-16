import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useRouter, Link } from "expo-router";
import useUserLogout from "../../hooks/useUserLogout";
import HoverableView from "../UI/HoverableView";
import { useCart } from "../../contexts/CartContext";

export default function Header() {
  const router = useRouter();
  const { logoutUser, loading } = useUserLogout();
  const { toggleCart } = useCart();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    sessionStorage.removeItem("token");
    router.push("/");
  };

  return (
    <View className="flex-row justify-between items-center w-full h-[70px] px-5 bg-primary z-50">
      <Link href="/">
        <Image
          source={require("../../assets/logo-cyna.webp")}
          style={{ width: 100, height: 40, resizeMode: "contain" }}
        />
      </Link>

      <TextInput
        placeholder="Rechercher..."
        placeholderTextColor="#fff"
        className="flex-1 max-w-[200px] h-10 px-3 rounded-full border border-white bg-primary-dark text-white"
      />

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

      <TouchableOpacity onPress={toggleCart}>
        <Image
          source={require("../../assets/basketshop.png")}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain",
            cursor: "pointer",
          }}
        />
      </TouchableOpacity>

      <HoverableView
        onMouseEnter={() => setIsProfileMenuVisible(true)}
        onMouseLeave={() => setIsProfileMenuVisible(true)}
        className="relative"
      >
        <Image
          source={require("../../assets/user.png")}
          style={{
            width: 35,
            height: 35,
            resizeMode: "contain",
            cursor: "pointer",
          }}
        />
      </HoverableView>

      {isProfileMenuVisible && (
        <View className="absolute top-[70px] right-0 w-[180px] bg-primary-dark rounded-lg p-2.5 z-50">
          <Link href="auth/register">
            <Text className="text-white mb-2.5">Inscription</Text>
          </Link>
          <Link href="auth/login">
            <Text className="text-cta mb-2.5">Connexion</Text>
          </Link>
          <Link href="orders/history">
            <Text className="text-white mb-2.5">Mes commandes</Text>
          </Link>
          <TouchableOpacity onPress={handleLogout} disabled={loading}>
            <Text className="text-white mb-2.5">Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
