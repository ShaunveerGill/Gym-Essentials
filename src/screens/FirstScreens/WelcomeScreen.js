import React, { useEffect, useRef, useState } from "react"; 
import { Animated, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
    const fadeAnimBackground = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const fadeAnimLogo = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [imageLoaded, setImageLoaded] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (imageLoaded) {
            Animated.timing(
                fadeAnimBackground,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(
                    fadeAnimLogo,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }
                ).start();
            });

            const timer = setTimeout(() => {
                navigation.navigate('Login');
            }, 3000);  

            return () => clearTimeout(timer);
        }
    }, [imageLoaded, fadeAnimBackground, fadeAnimLogo, navigation])

    return ( 
        <Animated.View style={{...styles.background, opacity: fadeAnimBackground}}>
            <ImageBackground
                style={StyleSheet.absoluteFill}
                source={require("../../assets/background.jpeg")}
                onLoad={() => setImageLoaded(true)}
            >
                <Animated.View style={{...styles.content, opacity: fadeAnimLogo}}>
                    <Animated.Image
                        style={styles.logo}
                        source={require("../../assets/logo.png")}
                    />
                    <Animated.Text style={styles.text}>
                        Gym
                    </Animated.Text>
                    <Animated.Text style={styles.text}>
                        Essentials
                    </Animated.Text>
                </Animated.View>
            </ImageBackground>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'white'
    }
})

export default WelcomeScreen;
