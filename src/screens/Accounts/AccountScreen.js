import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../../../firebase";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AccountStack = createNativeStackNavigator();

const AccountScreen = ({ navigation }) => {
  const {
    userEmail,
    setUserEmail,
    userName,
    setUserName,
    gender,
    setGender,
    setAge,
    age,
    setHeight,
    height,
    setWeight,
    weight,
    setGoal,
    goal,
    activityLevel,
    setActivityLevel,
  } = useContext(UserContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUserName("");
        setGender("");
        setAge("");
        setHeight("");
        setWeight("");
        setGoal("");
        setActivityLevel("");
        console.log("User signed out");
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };

  const nav = useNavigation();

  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name={userEmail} options={{ headerShown: false }}>
        {() => (
          <View style={styles.container}>
            <Image
              source={require("../../assets/TaskBarIcons/logoblack.png")}
              style={styles.logo}
            />

            <View style={styles.infoBoxes}>
              <ScrollView horizontal={true}style={styles.scrollViewContainer}>
                <Text style={styles.infoboxtext}>User Name: {userName}</Text>
              </ScrollView>
            </View>
            
            <View style={styles.infoBoxes}>
              <ScrollView horizontal={true}style={styles.scrollViewContainer}>
                <Text style={styles.infoboxtext}>Email: {userEmail}</Text>
              </ScrollView>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Age: {age}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => nav.navigate("AgeEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Height (cm): {height}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => nav.navigate("HeightEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Weight (lb): {weight}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => nav.navigate("WeightEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Gender: {gender}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => nav.navigate("GenderEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>


            {/* <View style={{...styles.infoBoxes, flexDirection: 'column'}}> */}
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Goal: {goal}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => nav.navigate("GoalEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Activity: {activityLevel}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => nav.navigate("ActivityEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>
            {/* </View> */}

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AccountStack.Screen>
    </AccountStack.Navigator>
  );
};

const styles = StyleSheet.create({
  editButtonGender: {
    backgroundColor: "white",
    position: "absolute",
    left: "50%",
    width: "25%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginLeft: 65,
  },
  editButtonGoal: {
    position: "absolute",
    left: "65%",
    width: "25%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginLeft: 65,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  infoBoxes: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  miniBoxes: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoBoxes2: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoboxtext: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default AccountScreen;
