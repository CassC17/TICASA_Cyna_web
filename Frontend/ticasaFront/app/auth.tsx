import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useUserLogin } from "../hooks/useUserLogin";

export default function Auth() {
  const router = useRouter();
  const { user } = useUserLogin();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold">Authentication</Text>
      {user ? (
        <Text className="text-lg">Welcome back, {user.name}!</Text>
      ) : (
        <Pressable onPress={() => router.push("/register")} className="mt-4 p-2 bg-blue-500 rounded">
          <Text className="text-white">Go to Register</Text>
        </Pressable>
      )}
    </View>
  );
}
