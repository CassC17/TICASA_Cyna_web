import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useRouter, Link } from "expo-router";
import useUserLogout from "../hooks/useUserLogout";

export default function Header() {
  const router = useRouter();
  const { logoutUser, loading } = useUserLogout();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;

  const hoverProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleLogout = async () => {
    await logoutUser();
    sessionStorage.removeItem("token");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Link href="/">
        <Image source={require("../assets/logo-cyna.webp")} style={styles.logo} />
      </Link>

      {!isMobile && (
        <>
          <TextInput style={styles.searchInput} placeholder="Rechercher..." />
          <Text style={styles.tab}>Catégories</Text>
          <Text style={styles.tab}>Contact</Text>
          <Text style={styles.tab}>A propos de Cyna</Text>
        </>
      )}

      <Link href="product">
            <Text style={styles.tab}>Produits</Text>
      </Link>

      <Image source={require("../assets/basketshop.png")} style={styles.shopimage} />

      <TouchableOpacity onPress={hoverProfileMenu}>
        <Image source={require("../assets/user.png")} style={styles.userimage} />
      </TouchableOpacity>

      {isProfileMenuVisible && (
        <View style={styles.profileMenu}>
          <Link href="auth/register">
            <Text style={styles.profileMenuItem}>Inscription</Text>
          </Link>
          <Link href="auth/login">
            <Text style={styles.profileMenuItem}>Connexion</Text>
          </Link>
          <TouchableOpacity onPress={handleLogout} disabled={loading}>
            <Text style={styles.profileMenuItem}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: "#3b82f6",
    zIndex: 1000,
  },
  tab: {
    color: "#fff",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  userimage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    cursor: "pointer",
  },
  shopimage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    cursor: "pointer",
  },
  searchInput: {
    flex: 1,
    maxWidth: 200,
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    color: "#fff",
    backgroundColor: "#0008",
  },
  profileMenu: {
    position: "absolute",
    top: 70,
    right: 0,
    width: 180,
    backgroundColor: "#6228FF",
    borderRadius: 10,
    padding: 10,
    zIndex: 1000,
  },
  profileMenuItem: {
    color: "#fff",
    marginBottom: 10,
  },
});
