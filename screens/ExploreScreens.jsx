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
        { id : 1, title : 'Nitrogen', uri : require('../assets/images/explore/nitrogen.png'), subtitle : 'nitrogen', value : nitro},
        { id: 2, title: 'Fosfor', uri : require('../assets/images/explore/fosfor.png'), subtitle : 'fosfor', value : fosfor},
        { id: 3, title: 'Photasium', uri : require('../assets/images/explore/potasium2.png'), subtitle : 'potassium', value : potas}
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
                style={styles.imageBg(Width, Height)}
            >                
                <View style={styles.boxTop(Width)}>
                    <Image
                        source={require('../assets/images/explore/npk.png')}
                        style={styles.boxTopImg}
                    />
                    <Text style={styles.boxTopTxt}>{title}</Text>
                    <Image
                        source={require('../assets/images/explore/line1.png')}
                        style={styles.lineImg(Width)}
                    />
                </View>
                <View style={styles.boxBot(Width)}>
                    {
                        exploreMenu.map(item =>(
                            <TouchableOpacity key={item.id} style={styles.btnMonitor}>
                                <Text style={styles.txtMonitor}>{item.subtitle}</Text>
                                <Image
                                    source={item.uri}
                                    style={styles.imgIcon}
                                />
                                <Text style={styles.txtValues}>{item.value}</Text>                    
                            </TouchableOpacity>
                        ))
                    }
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
    },
    imageBg : (lebar, tinggi) => ({
        width : lebar,
        height : tinggi,
        top : -15,
    }),
    boxTop : (lebar) => ({
        width : lebar,
        height : '54%',
        justifyContent : 'center',
        alignItems : 'center',
        top : SIZES.large + 6
    }),
    boxTopImg : {
        width : 200,
        height : 200,
        marginBottom : SIZES.xLarge
    },
    boxTopTxt : {
        fontFamily : 'extrabold',
        fontSize : SIZES.xLarge + 10,
        marginBottom : SIZES.medium
    },
    lineImg : (lebar) => ({
        width : lebar - 13,
        height : '18%'
    }),
    boxBot : (lebar) =>  ({
        width : lebar,
        height : '38%',
        padding : SIZES.large,
        flexDirection : 'row',
        justifyContent : 'space-evenly'
    }),
    btnMonitor : {
        flexDirection : 'column',
        alignItems : 'center',
        marginHorizontal : SIZES.large
    },
    txtMonitor : {
        fontFamily : 'bold',
        textTransform : 'capitalize',
        fontSize : SIZES.medium -2,
        marginBottom : SIZES.small - 7,
        color : COLORS.gray
    },
    imgIcon : {
        width : 93,
        height : 74,
        marginVertical : SIZES.medium - 9
    },
    txtValues : {
        fontFamily : 'semibold',
        textTransform : 'capitalize',
        fontSize : SIZES.large,
        marginTop : SIZES.small - 7,
        color : COLORS.gray
    }

})