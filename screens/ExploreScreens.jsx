import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants'
import Svg, { Path } from 'react-native-svg'

const ExploreScreens = ({ navigation }) => {
    const Width = Dimensions.get('screen').width;
    const Height = Dimensions.get('screen').height;

    const route = useRoute()
    const {id, title, ph, nitro, fosfor, potas, konduk, temp, lembap, image} = route.params
    // console.log(id, title, ph, nitro, fosfor, potas, konduk, temp, lembap)
    const [explore, setExplore] = useState('')

    const exploreMenu = [
        { id : 1, title : 'Nitrogen', uri : require('../assets/images/explore/nitrogen.png')},
        { id: 2, title: 'Fosfor', uri : require('../assets/images/explore/fosfor.png')},
        { id: 3, title: 'Photasium', uri : require('../assets/images/explore/potasium.png')}
    ]

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
            //Screen NPK
            explore === 'npk' ? 
            <ImageBackground
                source={require('../assets/images/background/npkScreen.png')}
                style={{
                    width : Width,
                    height : Height,
                    top : -15,
                }}
            >
                <View style={{
                    borderWidth : 1,
                    borderColor : 'red',
                    width : Width,
                    height : '54%',
                    justifyContent : 'center',
                    alignItems : 'center'
                }}>
                    <Image
                        source={require('../assets/images/explore/npk.png')}
                        style={{
                            width : 49,
                            height : 50
                        }}
                    />
                    <Text>{title}</Text>
                    <Text>{`${nitro}, ${fosfor}, ${potas}`}</Text>
                </View>
            </ImageBackground>
            :
            //Screen Tanah
            explore === 'tanah' ?
            <View>
                <Text>{title}</Text>
                <Text>{`${lembap}, ${konduk}, ${temp}`}</Text>
            </View>
            :
            //Screen PH
            explore === 'ph' ?
            <View>
                <Text>{title}</Text>
                <Text>{ph}</Text>
            </View> 
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
    }
})