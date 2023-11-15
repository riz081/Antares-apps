import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { useFonts } from 'expo-font'
import { ListsScreens, MonitorScreens, ExploreScreens } from './screens';

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

  // const [Ph, setPh] = useState()
  // const [Sm, setSm] = useState()
  // const [St, setSt] = useState()
  // const [Sc, setSc] = useState()
  // const [Ng, setNg] = useState()
  // const [Ff, setFf] = useState()
  // const [Pt, setPt] = useState()
  // const [loading, setLoading] = useState(true)  

  // PH
  const fetchData_PH = async () => {
    const res_ph = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/pH2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_ph){
      return res_ph.json()
    })
    const data_ph = res_ph['m2m:list'][0]['m2m:cin']['con'];
    const Ph = data_ph.length === 6 ?
               Number(data_ph.substring(1, 5)) :
               data_ph.length === 5 ?
               Number(data_ph.substring(1, 4)) :
               data_ph.length === 4 ?
               Number(data_ph.substring(1, 3)) :
               Number(data_ph.substring(1, 2)) 
    // const lengthPh = data_ph.length
    console.log('data Ph : ',Ph)
    setPh(Ph)
    setLoading(false)
  }

  // Soil Moisture(Kelembapan Tanah)
  const fetchData_SM = async () => {
    const res_sm = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Moisture2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_sm){
      return res_sm.json()
    })
    const data_sm = res_sm['m2m:list'][0]['m2m:cin']['con'];
    const Sm =  data_sm.length === 6 ?
                Number(data_sm.substring(1, 5)) :
                data_sm.length === 5 ?
                Number(data_sm.substring(1, 4)) :
                data_sm.length === 4 ?
                Number(data_sm.substring(1, 3)) :
                Number(data_sm.substring(1, 2)) 
    console.log('data Sm : ',Sm)
    setSm(Sm)
    setLoading(false)
  }

  // Soil Twmperature(Temperatur Tanah)
  const fetchData_ST = async () => {
    const res_st = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Temperature2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_st){
      return res_st.json()
    })
    const data_st = res_st['m2m:list'][0]['m2m:cin']['con'];
    const St =  data_st.length === 6 ?
                Number(data_st.substring(1, 5)) :
                data_st.length === 5 ?
                Number(data_st.substring(1, 4)) :
                data_st.length === 4 ?
                Number(data_st.substring(1, 3)) :
                Number(data_st.substring(1, 2)) 
    console.log('data St : ',St)
    setSt(St)
    setLoading(false)
  }

  // Soil Conductivity(Konduktivitas Tanah)
  const fetchData_SC = async () => {
    const res_sc = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Conductivity2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_sc){
      return res_sc.json()
    })
    const data_sc = res_sc['m2m:list'][0]['m2m:cin']['con'];
    const Sc =  data_sc.length === 6 ?
                Number(data_sc.substring(1, 5)) :
                data_sc.length === 5 ?
                Number(data_sc.substring(1, 4)) :
                data_sc.length === 4 ?
                Number(data_sc.substring(1, 3)) :
                Number(data_sc.substring(1, 2)) 
    console.log('data Sc : ',Sc)
    setSc(Sc)
    setLoading(false)
  }

  // Nitrogen(Nitrogen)
  const fetchData_NG = async () => {
    const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Nitrogen2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_ng){
      return res_ng.json()
    })
    const data_ng = res_ng['m2m:list'][0]['m2m:cin']['con'];
    const Ng =  data_ng.length === 6 ?
                Number(data_ng.substring(1, 5)) :
                data_ng.length === 5 ?
                Number(data_ng.substring(1, 4)) :
                data_ng.length === 4 ?
                Number(data_ng.substring(1, 3)) :
                Number(data_ng.substring(1, 2)) 
    console.log('data Ng : ',Ng)
    setNg(Ng)
    setLoading(false)
  }

  // Fosfor(Fosfor)
  const fetchData_FF = async () => {
    const res_ff = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Phosporus2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_ff){
      return res_ff.json()
    })
    const data_ff = res_ff['m2m:list'][0]['m2m:cin']['con'];
    const Ff =  data_ff.length === 6 ?
                Number(data_ff.substring(1, 5)) :
                data_ff.length === 5 ?
                Number(data_ff.substring(1, 4)) :
                data_ff.length === 4 ?
                Number(data_ff.substring(1, 3)) :
                Number(data_ff.substring(1, 2)) 
    console.log('data Ff : ',Ff)
    setFf(Ff)
    setLoading(false)
  }

  // Potassium(Potassium)
  const fetchData_PT = async () => {
    const res_pt = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Potassium2?fu=1&drt=2&ty=4',{
      method : 'get',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
      }
    })
    .then(function(res_pt){
      return res_pt.json()
    })
    const data_pt = res_pt['m2m:list'][0]['m2m:cin']['con'];
    const Pt =  data_pt.length === 6 ?
                Number(data_pt.substring(1, 5)) :
                data_pt.length === 5 ?
                Number(data_pt.substring(1, 4)) :
                data_pt.length === 4 ?
                Number(data_pt.substring(1, 3)) :
                Number(data_pt.substring(1, 2)) 
    console.log('data Pt : ',Pt)
    setPt(Pt)
    setLoading(false)
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
          name='Explore Screen'
          component={ ExploreScreens }
          options={{headerShown : false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
