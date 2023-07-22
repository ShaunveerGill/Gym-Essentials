import React from "react";
import { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./src/screens/FirstScreens/WelcomeScreen";
import LoginScreen from "./src/screens/FirstScreens/LoginScreen";
import Workouts from "./src/screens/Workouts/Workouts";
import PersonalRecords from "./src/screens/PR/PersonalRecords";
import FitnessCalculators from "./src/screens/Calculator/FitnessCalculators";
import signup from "./src/screens/FirstScreens/signup";
import AboutYou from "./src/screens/FirstScreens/AboutYou";
import AccountScreen from "./src/screens/Accounts/AccountScreen";
import { UserContextProvider } from "./src/context/UserContext";
import ManageRecord from "./src/screens/PR/ManageRecord";
import { Ionicons } from "@expo/vector-icons";
import GenderEdit from "./src/screens/Accounts/GenderEdit";
import GoalEdit from "./src/screens/Accounts/GoalEdit";
import ActivityEdit from "./src/screens/Accounts/ActivityEdit";
import AgeEdit from "./src/screens/Accounts/AgeEdit";
import HeightEdit from "./src/screens/Accounts/HeightEdit";
import WeightEdit from "./src/screens/Accounts/WeightEdit";
import ManageWorkout from "./src/screens/Workouts/ManageWorkout";
import EditExercise from "./src/screens/Workouts/EditExercise";
import { RecordsContextProvider } from "./src/context/RecordsContext";
import { WorkoutsContextProvider } from "./src/context/WorkoutsContext";
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import TimerModal from "./src/screens/Workouts/TimerModal";
import WorkoutList from "./src/screens/Workouts/WorkoutList";
import ChoosePlan from "./src/screens/Workouts/ChoosePlan";
import { useState } from "react";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

function FeaturesOverview({ navigation }) {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#D9D9D9" },
        headerTintColor: "black",
        tabBarStyle: { backgroundColor: "#D9D9D9" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
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
          tabBarLabel: "Calculators",
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
  const [lastSentDate, setLastSentDate] = useState(null);

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      const userName = notification.request.content.data.userName;
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      const userName = response.notification.request.content.data.userName;
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  const quotes = [
    "The only bad workout is the one that didn't happen",
    "The pain you feel today will be the strength you feel tomorrow",
    "RISE AND GRIND \u{1F1FA}\u{1F1F8} \u{1F985}",
    "SECOND PLACE IS THE FIRST LOSER",
    "Strive for progress, not perfection",
    "You don't have to be great to start, but you have to start to be great",
    "Everday is not rest day",
    "Success is the sum of small efforts repeated day in and day out",
    "The only way to achieve your goals is to start, stay committed, and never give up",
    "Don't wish for a healthy body, work for it",
    "Stop scrolling on Tiktok",
    "Workout so you can outrun your enemies",
    "I'm Ready, I'm Ready, I'm Ready",
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const fixedHour = 8; 
  const fixedMinute = 0; 

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My Daily Motivation',
        body: quote,
      },
      trigger: {
        hour: fixedHour,
        minute: fixedMinute,
        repeats: true,
      },
    });
  };

  // Remove the shouldSendNotification function, as it's no longer needed

  useEffect(() => {
    scheduleDailyNotification();
  }, []);


  return (
    <UserContextProvider>
      <RecordsContextProvider>
        <WorkoutsContextProvider>
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
              <Stack.Screen name="AgeEdit" component={AgeEdit} />
              <Stack.Screen name="HeightEdit" component={HeightEdit} />
              <Stack.Screen name="WeightEdit" component={WeightEdit} />
              <Stack.Screen name="GenderEdit" component={GenderEdit} />
              <Stack.Screen name="GoalEdit" component={GoalEdit} />
              <Stack.Screen name="ActivityEdit" component={ActivityEdit} />
              <Stack.Screen name="EditExercise" component={EditExercise} />
              <Stack.Screen name="ManageRecord" component={ManageRecord} />
              <Stack.Screen name="AboutYou" component={AboutYou} />
              <Stack.Screen name="AccountScreen" component={AccountScreen} />
              <Stack.Screen name="ManageWorkout"component={ManageWorkout}/>
              <Stack.Screen name="TimerModal"component={TimerModal}/>
              <Stack.Screen name="ChoosePlan"component={ChoosePlan}/>
              <Stack.Screen name="WorkoutList"component={WorkoutList}/>
              </Stack.Navigator>
            </NavigationContainer>
          </>

        </WorkoutsContextProvider>
      </RecordsContextProvider>
    </UserContextProvider>
  );
}
