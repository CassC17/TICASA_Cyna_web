import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface InputProps{
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    secureTextEntry?: boolean,
    multiline?: boolean,
    textAlignVertical?: "center" | "auto" | "top" | "bottom" | undefined,
}

export default function Input({ 
    label, 
    value, 
    onChangeText,  
    secureTextEntry = false, 
    multiline = false,
    textAlignVertical = "center",
}: InputProps) {

    return (
        <View className="w-full">
            {label && <Text className="mb-1 text-black text-base">{label}</Text>}  
            <TextInput
                className="w-full h-12 rounded-lg px-4 text-base bg-white shadow-sm"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                textAlignVertical={textAlignVertical}
            />
        </View>
    );
}