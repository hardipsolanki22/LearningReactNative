import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggesIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

      if (isLoggedIn !== "true") {
        router.push("/Login");
        setIsLoggesIn(false);
      } else {
        router.push("/Home");
        setIsLoggesIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const logOutHandler = async () => {
    await AsyncStorage.setItem("isLoggedIn", "false");
    router.push("/Login");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Home Page
        </Text>
        {isLoggedIn && <Button title="LogOut" onPress={logOutHandler} />}
      </View>
      <View
        style={{
          gap: 10,
          marginTop: 10,
          marginBottom: 30,
          flexDirection: "row",
        }}
      >
        <Button title="Login" onPress={() => router.push("/Login")} />
        <Button title="Sign Up" onPress={() => router.push("/Signup")} />
        <Button
          title="Reset Password"
          onPress={() => router.push("/ResetPassword")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
