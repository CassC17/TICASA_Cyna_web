import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
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
    { label: "Catégories" },
    { label: "Contact", path: "/contact" },
    { label: "À propos de Cyna", path: "/about" },
  ];

  return (
    <View style={styles.container}>
      <Link href="/">
        <Image source={require("../../assets/logo-cyna.webp")} style={styles.logo} />
      </Link>

      <TouchableOpacity onPress={toggleCart}>
        <Image source={require("../../assets/basketshop.png")} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {isMenuOpen && (
        <View style={styles.menu}>
          {navigationLinks.map((item, index) =>
            item.path ? (
              <Link href={item.path} key={index}>
                <Text style={styles.menuItem}>{item.label}</Text>
              </Link>
            ) : (
              <Text key={index} style={styles.menuItem}>{item.label}</Text>
            )
          )}

          <Link href="/auth/login">
            <Text style={styles.menuItem}>Se connecter</Text>
          </Link>
          <Link href="/auth/register">
            <Text style={styles.menuItem}>S'inscrire</Text>
          </Link>
          <TouchableOpacity onPress={handleLogout} disabled={loading}>
            <Text style={styles.menuItem}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: "#3b82f6",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  menuIcon: {
    fontSize: 30,
    color: "#fff",
  },
  menu: {
    position: "absolute",
    top: 70,
    right: 0,
    width: "75%",
    height: "100%",
    backgroundColor: "#2563eb",
    padding: 20,
    zIndex: 1000,
  },
  menuItem: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
  },
});