import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import useUserLogout from "../../hooks/useUserLogout";
import { useCart } from "../../contexts/CartContext";

export default function HeaderMobile() {
  const router = useRouter();
  const { logoutUser, loading } = useUserLogout();
  const { toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    sessionStorage.removeItem("token");
    setIsMenuOpen(false);
    router.push("/");
  };

  const navigate = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const navigationLinks = [
    { label: "Accueil", path: "/" },
    { label: "Produits", path: "/product" },
    { label: "Catégories", path: "/categories" },
    { label: "Contact", path: "/contact" },
    { label: "À propos de Cyna", path: "/about" },
  ];

  return (
    <View className="relative flex-row items-center justify-between h-[70px] px-5 bg-primary z-50">
      <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
        <Text className="text-white text-3xl">☰</Text>
      </TouchableOpacity>

      <Pressable onPress={() => router.push("/")}>
        <Image
          source={require("../../assets/logo-cyna.webp")}
          style={{ width: 100, height: 40, resizeMode: "contain" }}
        />
      </Pressable>

      <TouchableOpacity onPress={toggleCart}>
        <Image
          source={require("../../assets/basketshop.png")}
          style={{ width: 30, height: 30, resizeMode: "contain" }}
        />
      </TouchableOpacity>

      {isMenuOpen && (
        <View className="absolute top-0 left-0 w-full h-full z-50">
          <Pressable
            onPress={() => setIsMenuOpen(false)}
            className="absolute w-full h-full bg-black opacity-50"
          />

          <View className="w-3/4 h-full bg-blue-700 p-5">
            {navigationLinks.map((item, index) => (
              <Pressable key={index} onPress={() => navigate(item.path)}>
                <Text className="text-white text-lg mb-4">{item.label}</Text>
              </Pressable>
            ))}

            <Pressable onPress={() => navigate("/auth/login")}>
              <Text className="text-white text-lg mb-4">Se connecter</Text>
            </Pressable>

            <Pressable onPress={() => navigate("/auth/register")}>
              <Text className="text-white text-lg mb-4">S'inscrire</Text>
            </Pressable>

            <TouchableOpacity onPress={handleLogout} disabled={loading}>
              <Text className="text-white text-lg mb-4">Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
