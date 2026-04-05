import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user/user";

const getUsers = async (): Promise<User[] | null> => {
  try {
    const users = await AsyncStorage.getItem("users");

    if (users !== null) {
      return JSON.parse(users) as User[];
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addUser = async (user: User) => {
  try {
    const users = await getUsers();

    if (users?.length) {
      const isUserExist = users?.find((userIn) => userIn.id === user.id);

      if (isUserExist) throw new Error("User is already exist");

      const newUsersData = users?.push(user);

      await AsyncStorage.setItem("users", JSON.stringify(newUsersData));
    }
  } catch (error: any) {
    return error.message;
  }
};

const getSingleUser = async (userId: Date): Promise<User | string> => {
  try {
    const users = await getUsers();

    const user = users?.find((userIn) => userIn.id === userId);

    if (!user) throw new Error("User not found");

    return user;
  } catch (error: any) {
    return error.message;
  }
};

export { getUsers, getSingleUser, addUser };
