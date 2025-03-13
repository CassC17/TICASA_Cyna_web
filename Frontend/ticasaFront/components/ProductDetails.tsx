import { ScrollView, Text, Image, StyleSheet } from "react-native";
import React from "react";

interface Product {
  id: number;
  nom: string;
  image: string;
  price: number;
  description?: string;
}

interface ProductDetailsProps {
  prodPromoted: Product;
}

export default function ProductDetails({ prodPromoted }: ProductDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: prodPromoted.image }} style={styles.image} />
      <Text style={styles.title}>{prodPromoted.nom}</Text>
      <Text style={styles.price}>${prodPromoted.price}</Text>
      {prodPromoted.description && (
        <Text style={styles.description}>{prodPromoted.description}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
});
