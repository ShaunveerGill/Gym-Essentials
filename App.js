import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Workouts from './screens/Workouts';
import PersonalRecords from './screens/PersonalRecords';
import FitnessCalculators from './screens/FitnessCalculators';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function FeaturesOverview() {
  return(
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Workouts" component={Workouts} />
      <BottomTabs.Screen name="Personal Records" component={PersonalRecords} />
      <BottomTabs.Screen name="Fitness Calculators" component={FitnessCalculators} />
      </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false, gestureEnabled: false,
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
          <Stack.Screen name="FeaturesOverview" component={FeaturesOverview} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}




