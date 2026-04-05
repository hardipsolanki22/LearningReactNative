import { useRouter } from "expo-router";
import React, { useState } from "react";
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
  EmailIcon,
  PasswordIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  FacebookIcon,
  XIcon,
} from "../components/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addUser } from "../utils/auth";

const SignUp = () => {
  const router = useRouter();
  const [fieldsData, setFieldsData] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    email: "",
    fullName: "",
    password: "",
  });

  const arrow = "<";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fullNameRequiredError, setFullNaneRequiredError] =
    useState<string>("");
  const [emailRequiredError, setEmailRequiredError] = useState<string>("");
  const [passwordRequiredError, setPasswordRequiredError] =
    useState<string>("");

  const validation = () => {
    let isValid = true;
    if (!fieldsData.fullName) {
      isValid = false;
      setFullNaneRequiredError("Full name is required");
    }
    if (!fieldsData.email) {
      isValid = false;

      setEmailRequiredError("Password is required");
    }
    if (!fieldsData.password) {
      isValid = false;

      setPasswordRequiredError("Password is required");
    }
    return isValid;
  };

  const handleSignup = async () => {
    setFullNaneRequiredError("");
    setEmailRequiredError("");
    setPasswordRequiredError("");
    const isValid = validation();
    if (!isValid) return;
    try {
      setLoading(true);
      await addUser({ ...fieldsData, id: new Date() });
      router.push("/Login");
    } catch (error: any) {
      console.log("error in signup: ", error);
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
        <Text style={style.headingText}>Create Account</Text>
      </View>

      <View style={style.loginFormContainer}>
        <View>
          <Text style={style.LogintText}>Sign Up</Text>
          {error && (
            <View style={style.errorMessageConatiner}>
              <Text style={style.errorMessage}>{error}</Text>
            </View>
          )}
          <View style={style.fieldsGapContainer}>
            <View>
              <InputField
                label="Your Full Name"
                placeHolder="Enter your full name"
                value={fieldsData.fullName}
                onChange={(value) =>
                  setFieldsData((prevData) => ({
                    ...prevData,
                    fullName: value,
                  }))
                }
                icon={<UserIcon size={17} color="#888" />}
                error={fullNameRequiredError}
              />
            </View>
            <View>
              <InputField
                label="Your Email"
                placeHolder="Enter your email"
                value={fieldsData.email}
                onChange={(value) =>
                  setFieldsData((prevData) => ({
                    ...prevData,
                    email: value,
                  }))
                }
                keyboardType="email-address"
                icon={<EmailIcon size={17} color="#888" />}
                error={emailRequiredError}
              />
            </View>
            <View>
              <InputField
                label="Your Password"
                placeHolder="Enter your password"
                value={fieldsData.password}
                onChange={(value) =>
                  setFieldsData((prevData) => ({
                    ...prevData,
                    password: value,
                  }))
                }
                isPassword
                icon={<PasswordIcon size={17} color="#888" />}
                error={passwordRequiredError}
              />
            </View>
          </View>

          {/* Signup Button */}
          <View style={style.signupBtnContainer}>
            <Button loading={loading} onPress={handleSignup}>
              Sign Up
            </Button>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={style.bottomContainer}>
          <View style={style.loginContainer}>
            <TouchableOpacity onPress={() => router.push("/Login")}>
              <View style={style.loginRow}>
                <Text>Already have an account?</Text>
                <Text style={style.loginText}>Login</Text>
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
  fieldsGapContainer: {
    gap: 20,
  },
  fieldTopMargin: {
    marginTop: 20,
  },
  fieldsLableAndInputConatiner: {
    flexDirection: "row",
    gap: 5,
  },
  labelText: {
    color: "rgb(12, 7, 7)",
    marginBottom: 10,
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "rgba(23, 10, 10, 0.18)",
    padding: 10,
    borderRadius: 10,
  },
  passHideShowConatiner: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  signupBtnContainer: {
    marginTop: 40,
  },
  signupButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    shadowColor: "#007bff",
    shadowOffset: {
      width: 20,
      height: 20,
    },
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "column",
  },
  loginContainer: {
    alignItems: "center",
    marginVertical: 55,
  },
  loginRow: {
    flexDirection: "row",
  },
  loginText: {
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

export default SignUp;
