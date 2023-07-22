import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react"; // Import from "react", not "react-native"
import { UserContext } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { handleLogout } from "../../data/userServices";
import { resetUserContext } from "../../controller/UserController";
import { RecordsContext } from '../../context/RecordsContext';
import { WorkoutsContext } from "../../context/WorkoutsContext";


const AccountStack = createNativeStackNavigator();

const AccountScreen = () => {
  const navigation = useNavigation();
  const UserCtx = useContext(UserContext);
  const RecordsCtx = useContext(RecordsContext);
  const WorkoutsCtx = useContext(WorkoutsContext);

  const submithandler = () => {
    handleLogout()
      .then(() => {
        RecordsCtx.clearRecords(); 
        WorkoutsCtx.clearWorkouts();
        UserCtx.clearUserContext();
        console.log("sdf");
        console.log(RecordsCtx.records);
        console.log(WorkoutsCtx.workouts);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Error", error.message, [{ text: "OK" }]);
      });
  };

  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name={UserCtx.userEmail} options={{ headerShown: false }}>
        {() => (
          <View style={styles.container}>
            <Image
              source={require("../../assets/TaskBarIcons/logoblack.png")}
              style={styles.logo}
            />

            <View style={styles.infoBoxes}>
              <ScrollView horizontal={true}style={styles.scrollViewContainer}>
                <Text style={styles.infoboxtext}>User Name: {UserCtx.userName}</Text>
              </ScrollView>
            </View>
            
            <View style={styles.infoBoxes}>
              <ScrollView horizontal={true}style={styles.scrollViewContainer}>
                <Text style={styles.infoboxtext}>Email: {UserCtx.userEmail}</Text>
              </ScrollView>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Age: {UserCtx.age}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => navigation.navigate("AgeEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Height (cm): {UserCtx.height}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => navigation.navigate("HeightEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Weight (lb): {UserCtx.weight}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => navigation.navigate("WeightEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Gender: {UserCtx.gender}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => navigation.navigate("GenderEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Goal: {UserCtx.goal}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => navigation.navigate("GoalEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Activity: {UserCtx.activityLevel}</Text>
              <TouchableOpacity
                style={styles.editButtonGoal}
                onPress={() => navigation.navigate("ActivityEdit")}
              >
                <Ionicons name="ellipsis-horizontal" size={18} color="black" />
              </TouchableOpacity>
            </View>
            {/* </View> */}

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={submithandler}>
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
