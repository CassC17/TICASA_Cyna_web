import { View, Text, Pressable, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import useIsLogout from "../hooks/useIsLogout";

export default function Header() {
  const router = useRouter();
  const logout = useIsLogout();

  return (
    <View className="w-full flex-row justify-between p-4 bg-blue-500">
      <Text className="text-white text-xl font-bold">My App</Text>
      
      {Platform.OS === "web" ? (
        <Link href="/profile">
          <Text className="text-white">Profile</Text>
        </Link>
      ) : (
        <Pressable onPress={() => router.push("/profile")}>
          <Text className="text-white">Profile</Text>
        </Pressable>
      )}

      <Pressable onPress={logout} style={{ marginLeft: 16 }}>
        <Text className="text-white">Logout</Text>
      </Pressable>
    </View>
  );
}
