import React from "react";
import { useEffect } from 'react';
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
import { UserContextProvider } from "./UserContext";
import ManageRecord from "./screens/ManageRecord";
import { Ionicons } from "@expo/vector-icons";
import GenderEdit from "./screens/GenderEdit";
import GoalEdit from "./screens/GoalEdit";
import ActivityEdit from "./screens/ActivityEdit";
import AgeEdit from "./screens/AgeEdit";
import HeightEdit from "./screens/HeightEdit";
import WeightEdit from "./screens/WeightEdit";
import ManageWorkout from "./screens/ManageWorkout";
import EditExercise from "./screens/EditExercise";
import { RecordsContextProvider } from "./RecordsContext";
import { WorkoutsContextProvider } from "./WorkoutsContext";
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import TimerModal from "./screens/TimerModal";

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

{/*const headerLeftIcon = (navigation) => (
  <Ionicons
    name="camera-outline"
    color="black"
    size={24}
    onPress={() => {
      // handle icon press if needed
    }}
    style={{ marginLeft: 25 }}
  />
  );*/}

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
          //headerLeft: () => headerLeftIcon(BeReal), // Add the headerLeft option
        }}
      />
      {/* ...Other screens */}
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
          //headerLeft: () => headerLeftIcon(BeReal), // Add the headerLeft option
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
          //headerLeft: () => headerLeftIcon(navigation), // Add the headerLeft option
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
          //headerLeft: () => headerLeftIcon(navigation), // Add the headerLeft option
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
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

      /*if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }*/
    }

    configurePushNotifications();

  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        const userName = notification.request.content.data.userName;
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const userName = response.notification.request.content.data.userName;
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);


  //Generates ONCE A DAY (not broken, just change the time lol)
  const randomHour = Math.floor(Math.random() * 13) + 8; // Random hour between 8 and 20
  const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59

  const quotes = [
    "The only bad workout is the one that didn't happen",
    "The pain you feel today will be the strength you feel tomorrow",
    "RISE AND GRIND \u{1F1FA}\u{1F1F8} \u{1F985}",
    "SECOND PLACE IS THE FIRST LOSER",
    "Strive for progress, not perfection",
    "You don't have to be great to start, but you have to start to be great",
    "Still tired huh",
    "Everday is not rest day",
    "Put the burger down",
    "Success is the sum of small efforts repeated day in and day out",
    "The only way to achieve your goals is to start, stay committed, and never give up",
    "Don't wish for a healthy body, work for it",
    "You can barely do 3 pushups",
    "Stop scrolling Tiktok",
    "Workout so you can outrun your enemies",
  ]
  const quote = quotes[Math.floor(Math.random() * 14)];

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My Daily Motivation',
        body: quote,
      },
      trigger: {
        hour: randomHour,
        minute: randomMinute,
        repeats: true,
      },
    })
  }

  scheduleDailyNotification();

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
              </Stack.Navigator>
            </NavigationContainer>
          </>

        </WorkoutsContextProvider>
      </RecordsContextProvider>
    </UserContextProvider>
  );
}
