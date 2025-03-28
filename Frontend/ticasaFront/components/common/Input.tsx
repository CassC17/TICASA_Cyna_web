import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface InputProps{
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    secureTextEntry?: boolean,
    multiline?: boolean,
    textAlignVertical?: "center" | "auto" | "top" | "bottom" | undefined,
    variant?: "default" | "textarea"
}

export default function Input({ 
    label, 
    value, 
    onChangeText,  
    secureTextEntry = false, 
    multiline = false,
    textAlignVertical = "center",
    variant = "default"
}: InputProps) {

    const inputStyle = variant === "textarea" ? "h-40 py-2" : "h-12";

    return (
        <View>
            {label && <Text className="mb-1 text-black text-base">{label}</Text>}  
            <TextInput
                className={`w-full border border-gray-300 rounded-lg px-4 text-lg bg-white shadow ${inputStyle}`}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                textAlignVertical={textAlignVertical}
            />
        </View>
    );
}