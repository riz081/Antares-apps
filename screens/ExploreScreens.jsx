import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

const ExploreScreens = ({ navigation }) => {
    const route = useRoute()
    const {id, title, ph, nitro, fosfor, potas, konduk, temp, lembap} = route.params
    // console.log(id, title, ph, nitro, fosfor, potas, konduk, temp, lembap)
    const [explore, setExplore] = useState('')

    useEffect(() => {
        if(id === 1){
            setExplore('npk')
        }
        if(id === 2){
            setExplore('tanah')
        }
        if(id === 3){
            setExplore('ph')
        }
    },[])

  return (
    <View style={styles.container}>
        {
            explore === 'npk' ? 
            <Text>{`${nitro}, ${fosfor}, ${potas}`}</Text>
            :
            explore === 'tanah' ?
            <Text>{`${lembap}, ${konduk}, ${temp}`}</Text>
            :
            explore === 'ph' ? 
            <Text>{ph}</Text>
            : 
            <Text>ExploreScreens</Text>
        }
    </View>
  )
}

export default ExploreScreens

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})