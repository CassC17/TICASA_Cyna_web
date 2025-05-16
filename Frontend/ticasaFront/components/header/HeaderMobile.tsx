import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";
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
        router.push("/");
    };

    const navigationLinks = [
        { label: "Accueil", path: "/" },
        { label: "Produits", path: "/product" },
        { label: "Catégories", path: "/categories" },
        { label: "Contact", path: "/contact" },
        { label: "À propos de Cyna", path: "/about" },
    ];

    return (
        <View className="relative flex-row items-center justify-between h-[70px] px-5 bg-blue-500">
            <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <Text className="text-white text-3xl">☰</Text>
            </TouchableOpacity>

            <Link href="/">
                <Image
                    source={require("../../assets/logo-cyna.webp")}
                    style={{ width: 100, height: 40, resizeMode: "contain" }}
                />
            </Link>

            <TouchableOpacity onPress={toggleCart}>
                <Image
                    source={require("../../assets/basketshop.png")}
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
            </TouchableOpacity>

            {isMenuOpen && (
                <View className="absolute top-0 left-0 mt-16 w-3/4 h-full bg-blue-700 p-5 z-999">
                    {navigationLinks.map((item, index) =>
                        item.path ? (
                        <Link href={item.path} key={index}>
                            <Text className="text-white text-lg mb-4">{item.label}</Text>
                        </Link>
                        ) : (
                        <Text key={index} className="text-white text-lg mb-4">
                            {item.label}
                        </Text>
                        )
                    )}

                    <Link href="/auth/login">
                        <Text className="text-white text-lg mb-4">Se connecter</Text>
                    </Link>

                    <Link href="/auth/register">
                        <Text className="text-white text-lg mb-4">S'inscrire</Text>
                    </Link>

                    <TouchableOpacity onPress={handleLogout} disabled={loading}>
                        <Text className="text-white text-lg mb-4">Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}