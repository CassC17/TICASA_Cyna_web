import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { useRouter, Link } from "expo-router";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Link href="/"><Image source={require('../assets/logo-cyna.webp')} style={styles.logo} /></Link>

      <Link href="product"><Text style={styles.tab}>Produits</Text></Link>

      <Link href="auth/register"><Text style={styles.tab}>Inscription</Text></Link>

      <Link href="auth/login"><Text style={styles.tab}>Connexion</Text></Link>

      <TextInput style={styles.searchInput} placeholder="Rechercher..." />

      <Image source={require('../assets/basketshop.png')} style={styles.shopimage} />

      <Image source={require('../assets/user.png')} style={styles.userimage} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 70,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  tab: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 125,
    resizeMode: 'contain',
    top: 2,
  },
  userimage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    cursor: 'pointer',
  },
  shopimage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    cursor: 'pointer',
  },
  searchInput: {
    height: 40,
    width: 200,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    color: '#fff',
    marginLeft: 20,
    backgroundColor: '#0008',
  },
});