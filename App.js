import React from "react";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Workouts from "./screens/Workouts";
import PersonalRecords from "./screens/PersonalRecords";
import FitnessCalculators from "./screens/FitnessCalculators";
import signup from "./screens/signup";
import AboutYou from "./screens/AboutYou";
import AccountScreen from "./screens/AccountScreen";
import { UserProvider, UserContextProvider } from "./UserContext";
<<<<<<< Updated upstream
import ManageRecord from "./screens/ManageRecord";
import { Ionicons } from "@expo/vector-icons";
import GenderEdit from "./screens/GenderEdit";
import GoalEdit from "./screens/GoalEdit";
import ActivityEdit from "./screens/ActivityEdit";
=======
import { RecordsContextProvider } from "./RecordsContext";
import ManageRecord from './screens/ManageRecord';
import { Ionicons } from '@expo/vector-icons';
>>>>>>> Stashed changes

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function FeaturesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#D9D9D9" },
        headerTintColor: "black",
        tabBarStyle: { backgroundColor: "#D9D9D9" },
        tabBarActiveTintColor: "white",
      }}
    >
      <BottomTabs.Screen
        name="Workouts"
        component={Workouts}
        options={{
          title: "Workouts",
          tabBarLabel: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="barbell-outline"
              color={color === "white" ? "white" : "black"}
              size={30}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="PersonalRecords"
        component={PersonalRecords}
        options={{
          title: "Personal Records",
          tabBarLabel: "Personal Records",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="trophy-outline"
              color={color === "white" ? "white" : "black"}
              size={30}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="FitnessCalculators"
        component={FitnessCalculators}
        options={{
          title: "Fitness Calculators",
          tabBarLabel: "Fitness Calculators",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calculator-outline"
              color={color === "white" ? "white" : "black"}
              size={30}
            />
          ),
        }}
      />

      <BottomTabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color === "white" ? "white" : "black"}
              size={30}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <UserContextProvider>
      <RecordsContextProvider>
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              cardStyleInterpolator: ({ current, layouts }) => ({
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              }),
            }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="FeaturesOverview"
              component={FeaturesOverview}
            />
            <Stack.Screen name="signup" component={signup} />
            <Stack.Screen name="GenderEdit" component={GenderEdit} />
            <Stack.Screen name="GoalEdit" component={GoalEdit} />
            <Stack.Screen name="ActivityEdit" component={ActivityEdit} />
            <Stack.Screen name="ManageRecord" component={ManageRecord} />
            <Stack.Screen name="AboutYou" component={AboutYou} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
      </RecordsContextProvider>
    </UserContextProvider>
  );
}