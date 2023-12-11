import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

const HistoryScreens = () => {
    const route = useRoute()
    const {title} = route.params
    // console.log(route.params)
    const [loading, setLoading] = useState(true)
    const [dataNitro, setDataNitro] = useState()

    const fetchNitro = async() => {
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
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { con: nilai, hari: dayName, jam : hours, menit : minutes };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataNitro(data)
    }

  useEffect(() => {
    fetchNitro()
  }, [])

  // console.log('fetch nitro : '+ dataNitro)

  return (
    <View style={{
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    }}>
        {
            title === 'nitrogen' ?             
            // <Text>{title} - nitrogen - {dataNitro}</Text>            
            <FlatList
              data={dataNitro ? dataNitro.slice(0, 10) : []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                  <Text>{`Content: ${item.con}, Timestamp: ${item.hari} - ${item.jam} : ${item.menit}`}</Text>
                </View>
              )}
            />
            :
            title === 'fosfor' ? 
            <Text>{title} - fosfor</Text>
            :
            title === 'potassium' ? 
            <Text>{title} - potassium</Text>
            :
            title === 'kelembapan' ? 
            <Text>{title} - kelembapan</Text>
            :
            title === 'konduktivitas' ? 
            <Text>{title} - konduktivitas</Text>
            :
            title === 'temperature' ? 
            <Text>{title} - temperature</Text>
            :
            title === 'PH' ? 
            <Text>{title} - ph</Text>
            :
            <Text>not found</Text>
        }
    </View>
  )
}

export default HistoryScreens

const styles = StyleSheet.create({})