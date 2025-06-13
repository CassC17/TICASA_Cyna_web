import { View, Text, ImageBackground, Button } from "react-native";
import React from "react";
import { Category } from "../types/Category";


const getLocalImage = (imageName: string) => {
    const images: Record<string, any> = {
        "tv.png": require("../assets/products/cynaSOC.png"),
        "laptop.png": require("../assets/products/cynaSOC.png"),
        "frog.jpg": require("../assets/products/cynaSOC.png"),
    };
    return images[imageName] 
};

interface CategoryResumeProps {
    category: Category,
    onPress: () => void
}


export default function CategoryResume({ category, onPress }: CategoryResumeProps) {
    return (
        <View className="p-4">
            <ImageBackground
                source={getLocalImage(category.image)} 
                imageStyle={{ borderRadius: 12 }}
                className="rounded-xl overflow-hidden"
            >
                <View className="bg-black/50 p-4 rounded-xl">
                    <View>
                        <Text className="text-white text-xl font-semibold mb-1">{category.name}</Text>
                        {category.description && (
                            <Text className="text-white text-sm">
                                {category.description}
                            </Text>
                        )}
                    </View>
                    <Button title="Voir les produits" onPress={onPress} />
                </View>
            </ImageBackground>
        </View>
    );
}