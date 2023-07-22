# Gym-Essentials
An app that has all the necessary resources that would make going to the gym an easy experience. No need to open other apps or websites.

## Features
* Personal Records Tracker
    * This is a place to keep all your personal records for different exercises. You are able to save the exercise name, the date when the record was accomplished, and what the record was.

* Workouts Tracker
    * This is a place to keep all your different type of workouts (Ex: Leg Day, Chest Day, etc.) and all the different exercises that are involved for the corresponding workout. The app also has pre-defined workouts in which you can use just as is or use them as a starter and build on top of them or edit them how you'd like. For each exercise, you have a place to put how many sets and reps you do and a timer that you can use to track your rest time in between sets during your workouts. 

* Calculators (Body Mass Index, Daily Caloric Intake, Daily Protein Intake)
    * This part of the app calculates your Body Mass Index, Daily Caloric Intake, and Daily Protein Intake based on the information you indicated (Ex: Height, Weight, etc.) when you created your account. You can edit your information on the account screen of the app to reflect your new current state or if you are just curious to test out what different values would give you.

## Installation Instructions
1. Install Visual Studio Code
    * https://code.visualstudio.com/download

2. Install Node.js (LTS Version)
    * https://nodejs.org/en

3. Open a new Terminal on your VS Code IDE

4. Enter the following commands in your terminal:
    * Create a new expo app folder: 
        * npx create-expo-app [whatever you want to name the folder]

    * Go to the directory of the new expo app folder:
        * cd [name of folder]

    * Clone our Git Repo in this folder:
        * git clone https://github.com/ShaunveerGill/Gym-Essentials.git
    
### Start here if you have done eveything before this and you're currently on the App's directory 
5. Start the Server by running the following command:
    * npx expo start

6. Press the 'i' key on your keyboard to open the IOS Simulator and start the app
    * Must have installed XCode before doing this

OR

6. Scan the QR Code that appears on your terminal with your IPhone Camera and click the link to start the app on Expo Go
    * Must have installed the "Expo Go" App in the App Store on your IPhone
    * Your IPhone and Computer in which is running the server must be on the same wifi 

7. To stop the server from running, press the 'ctrl' key and 'c' key on your keyboard at the same time in your terminal