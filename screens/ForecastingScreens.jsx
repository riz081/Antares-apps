import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { useRoute } from '@react-navigation/native'

const ForecastingScreens = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute()
  const { ph, nitro, fosfor, potas, konduk, temp, lembap } = route.params

  // Versi GET METHOD
  const fetchData2 = async () => {
    try {
      const response = await fetch('http://10.217.23.141:5000/predict', {
        method: 'GET',
      });

      if (response.ok) {
        const jsonData = await response.json();
        const forecastingResult = jsonData.forecasting;
        console.log('data : '+forecastingResult)
        setApiData(forecastingResult);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Versi POST METHOD
  const fetchData = async () => {
    const body = {
      data_con: [ph, nitro, fosfor, potas, konduk, temp, lembap],
    };

    const headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
    }

    try {
      const response = await axios.post('http://172.26.192.1:5000/predict', body, { headers });
      const dataForecasting = response.data;
      const forecastData = dataForecasting.forecasting
      console.log('Data forecasting:', dataForecasting);
      setApiData(forecastData)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data forecasting:', error);
    }
  }  

  useEffect(() => {    
    fetchData()
  }, []);

  if (apiData) {
    console.log('Data forecasting:', apiData);
  }

  return (
    <View>
      {loading === true ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>Forecasting Result: {apiData}</Text>
        </View>
      )}
    </View>
  );
};

export default ForecastingScreens;
