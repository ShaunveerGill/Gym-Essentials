import React from 'react';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Workouts from './screens/Workouts';
import PersonalRecords from './screens/PersonalRecords';
import FitnessCalculators from './screens/FitnessCalculators';
import signup from './screens/signup';
import AboutYou from './screens/AboutYou';
import AccountScreen from './screens/AccountScreen';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function FeaturesOverview() {
  return(
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'gray' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: 'gray' },
        tabBarActiveTintColor: 'white',
      }}
    >
      <BottomTabs.Screen 
        name="Workouts" 
        component={Workouts} 
        options={{
          title: 'Workouts',
          tabBarLabel: 'Workouts',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: size, height: size }} color={color} source={require('./assets/TaskBarIcons/clock.png')}/>
          ),
        }}
      />
      <BottomTabs.Screen 
        name="PersonalRecords" 
        component={PersonalRecords}
        options={{
          title: 'Personal Records',
          tabBarLabel: 'Personal Records',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: size, height: size }} color={color} source={require('./assets/TaskBarIcons/trophy.png')}/>
          ),
        }}
      />
      <BottomTabs.Screen 
        name="FitnessCalculators" 
        component={FitnessCalculators}
        options={{
          title: 'Fitness Calculators',
          tabBarLabel: 'Fitness Calculators',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: size, height: size }} color={color} source={require('./assets/TaskBarIcons/calculator.png')}/>
          ),
        }}
      />
      <BottomTabs.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: size, height: size }} color={color} source={require('./assets/TaskBarIcons/clock.png')}/>
            ),
        }}
      />
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
          <Stack.Screen name="signup" component={signup} />
          <Stack.Screen name="AboutYou" component={AboutYou} />
          <Stack.Screen name="Account" component={AccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}




