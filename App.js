import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { useFonts } from 'expo-font'
import { ListsScreens, MonitorScreens, ForecastingScreens, ExploreScreens, HistoryScreens } from './screens';

export default function App() {

  const [ fontsLoaded ] = useFonts({
    regular : require("./assets/fonts/Poppins-Regular.ttf"),
    light : require("./assets/fonts/Poppins-Light.ttf"),
    medium : require("./assets/fonts/Poppins-Medium.ttf"),
    bold : require("./assets/fonts/Poppins-Bold.ttf"),
    semibold : require("./assets/fonts/Poppins-SemiBold.ttf"),
    extrabold : require("./assets/fonts/Poppins-ExtraBold.ttf"),
  })

  const onLayoutRootView = useCallback(async() => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded] );

  if(!fontsLoaded){
    return null;
  }

  const Stack = createNativeStackNavigator()

  return (    
    <NavigationContainer>
      <StatusBar hidden = {true}/>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={ BottomTabNavigation }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='List Screen'
          component={ ListsScreens }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='Monitor Screen'
          component={ MonitorScreens }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='Forecasting Screen'
          component={ ForecastingScreens }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='Explore Screen'
          component={ ExploreScreens }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='History Screen'
          component={ HistoryScreens }
          options={{headerShown : false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
