import React from "react";
import { Platform, View, ViewProps } from "react-native";

interface Props extends ViewProps {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children: React.ReactNode;
}

export default function HoverableView({ onMouseEnter, onMouseLeave, children, ...props }: Props) {
    if (Platform.OS === "web") {
        return (
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </div>
        );
    }

    return <View {...props}>{children}</View>;
}
