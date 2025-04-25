import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Category } from "../types/Category";


const getLocalImage = (imageName: string) => {
    const images: Record<string, any> = {
        "tv.png": require("../assets/products/tv.png"),
        "laptop.png": require("../assets/products/laptop.png"),
        "frog.jpg": require("../assets/products/frog.png"),
    };
    return images[imageName] 
};

interface CategoryResumeProps {
    category: Category;
}


export default function CategoryResume({ category }: CategoryResumeProps) {
    return (
        <View>
            <ImageBackground
                source={getLocalImage(category.image)} 
                imageStyle={{ borderRadius: 10 }}
            >
            <Text>{category.name}</Text>
            {category.description && (
                <Text>
                    {category.description}
                </Text>
            )}
            </ImageBackground>
        </View>
    );
}