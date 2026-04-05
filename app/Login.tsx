import { useRouter } from "expo-router";
import React, { use, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  UserIcon,
  PasswordIcon,
  EyeIcon,
  EyeOffIcon,
  FacebookIcon,
  XIcon,
  GoogleIcon,
} from "../components/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { getUsers } from "../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailRequiredError, setEmailRequiredError] = useState<string>("");
  const [passwordRequiredError, setPasswordRequiredError] =
    useState<string>("");
  const arrow = "<";

  const validation = () => {
    let isValid = true;
    if (!email) {
      let isValid = false;
      setEmailRequiredError("Email is required");
    }
    if (!password) {
      isValid = false;
      setPasswordRequiredError("Password is required");
    }
    return isValid;
  };

  const handleLogin = async () => {
    setEmailRequiredError("");
    setPasswordRequiredError("");
    const isValid = validation();
    if (!isValid) return;
    try {
      setLoading(true);
      const users = await getUsers();
      if (users?.length) {
        const user = users.find((user) => user.email === email);
        if (!user) {
          setError("User not found...!");
          return;
        }
        if (password !== user.password) {
          setError("Invalid password...!");
          return;
        }
        await AsyncStorage.setItem("isLoggedIn", "true");
        router.push("/Home");
      }
    } catch (error: any) {
      console.log("error in login: ", error);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.conatiner}>
      <View style={style.arrowBtnContainer}>
        <TouchableOpacity onPress={() => router.push("/Index")}>
          <Text style={style.arrowBtn}>{arrow}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.headingText}>Welcome Back</Text>
      </View>

      <View style={style.loginFormContainer}>
        <View>
          <Text style={style.LogintText}>Login</Text>
          {error && (
            <View style={style.errorMessageConatiner}>
              <Text style={style.errorMessage}>{error}</Text>
            </View>
          )}
          <View style={style.loginFieldsContainer}>
            <View>
              <InputField
                label="Your Email"
                placeHolder="Enter your email"
                value={email}
                onChange={(value) => setEmail(value)}
                keyboardType="email-address"
                error={emailRequiredError}
                icon={<UserIcon size={17} color="#888" />}
              />
            </View>
            <View>
              <InputField
                label="Your Password"
                placeHolder="Enter your password"
                value={password}
                onChange={(value) => setPassword(value)}
                isPassword
                error={passwordRequiredError}
                icon={<PasswordIcon size={17} color="#888" />}
              />
            </View>
          </View>

          <View style={style.forgotPasswordTextConatiner}>
            <TouchableOpacity onPress={() => router.push("/ForgotPassword")}>
              <Text style={style.forgotPasswordText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button loading={loading} onPress={handleLogin}>
              Login
            </Button>
          </View>
        </View>

        <View style={style.bottomContainer}>
          <View style={style.signupContainer}>
            <TouchableOpacity onPress={() => router.push("/Signup")}>
              <View style={style.signupRow}>
                <Text>Are you new here?</Text>
                <Text style={style.signupText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={style.socialIconsContainer}>
            <GoogleIcon size={30} />
            <FacebookIcon size={30} />
            <XIcon size={30} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  arrowBtnContainer: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  arrowBtn: {
    color: "#007bff",
    fontSize: 30,
    fontWeight: "bold",
  },
  textContainer: {
    width: "100%",
    height: "100%",
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
  },
  loginFormContainer: {
    width: "100%",
  },
  LogintText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 40,
  },
  loginFieldsContainer: {
    gap: 20,
  },
  forgotPasswordTextConatiner: {
    marginVertical: 30,
  },
  forgotPasswordText: {
    color: "#007bff",
    textAlign: "center",
    fontWeight: "bold",
  },

  bottomContainer: {
    flexDirection: "column",
  },
  signupContainer: {
    alignItems: "center",
    marginVertical: 55,
  },
  signupRow: {
    flexDirection: "row",
  },
  signupText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  errorMessageConatiner: {
    margin: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    padding: 5,
  },
});

export default Login;
