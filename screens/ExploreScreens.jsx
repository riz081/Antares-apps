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

    const exploreNpk = [
        { id : 1, title : 'Nitrogen', uri : require('../assets/images/explore/nitrogen.png'), subtitle : 'nitrogen', value : nitro},
        { id: 2, title: 'Fosfor', uri : require('../assets/images/explore/fosfor.png'), subtitle : 'fosfor', value : fosfor},
        { id: 3, title: 'Photasium', uri : require('../assets/images/explore/potasium2.png'), subtitle : 'potassium', value : potas}
    ]

    const exploreTanah = [
        { id : 1, title : 'Kelembapan', uri : require('../assets/images/explore/humadity.png'), subtitle : 'kelembapan', value : lembap},
        { id: 2, title: 'Konduktivitas', uri : require('../assets/images/explore/conductivity.png'), subtitle : 'konduktivitas', value : konduk},
        { id: 3, title: 'Temperature', uri : require('../assets/images/explore/temprature.png'), subtitle : 'temperature', value : temp}
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
                <View style={styles.boxTop(Width, SIZES.large + 36)}>
                    <Image
                        source={require('../assets/images/explore/npk.png')}
                        style={styles.boxTopImg(320, 200, 0)}
                    />
                    <Text style={styles.boxTopTxt('extrabold', SIZES.xLarge + 10, COLORS.black)}>{title}</Text>
                    <Image
                        source={require('../assets/images/explore/line1.png')}
                        style={styles.lineImg(Width, '18%')}
                    />
                </View>
                <View style={styles.boxBot(Width)}>
                    {
                        exploreNpk.map(item =>(
                            <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : item.subtitle})} key={item.id} style={styles.btnMonitor}>
                                <Text style={styles.txtMonitor('bold', SIZES.medium -2, COLORS.gray)}>{item.subtitle}</Text>
                                <Image
                                    source={item.uri}
                                    style={styles.imgIcon}
                                />
                                <Text style={styles.txtValues('semibold', SIZES.large, COLORS.gray)}>{item.value}</Text>                    
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ImageBackground>
            :
            //Screen Tanah
            explore === 'tanah' ?
            <ImageBackground
                source={require('../assets/images/background/tanahScreen.png')}
                style={styles.imageBg(Width, Height)}
            >                
                <View style={styles.boxTop(Width, SIZES.large + 36)}>
                    <Image
                        source={require('../assets/images/explore/soil.png')}
                        style={styles.boxTopImg(200, 110, 15, SIZES.xLarge)}
                    />
                    <Text style={styles.boxTopTxt('semibold', SIZES.xLarge + 10, COLORS.white)}>{title}</Text>
                    <Image
                        source={require('../assets/images/explore/line2.png')}
                        style={styles.lineImg(Width, '21%')}
                    />
                </View>
                <View style={styles.boxBot(Width)}>
                    {
                        exploreTanah.map(item =>(
                            <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : item.subtitle})} key={item.id} style={styles.btnMonitor}>
                                <Text style={styles.txtMonitor('bold', SIZES.medium -2, COLORS.lowWhite)}>{item.subtitle}</Text>
                                <Image
                                    source={item.uri}
                                    style={styles.imgIcon}
                                />
                                <Text style={styles.txtValues('semibold', SIZES.large, COLORS.lowWhite)}>{item.value}</Text>                    
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ImageBackground>
            :
            //Screen PH
            explore === 'ph' ?
            <ImageBackground
                source={require('../assets/images/background/phScreen.png')}
                style={styles.imageBg(Width, Height, 'center', 'center')}
            >                
                <View style={styles.boxTop(Width, -SIZES.xxLarge)}>
                    <Image
                        source={require('../assets/images/explore/ph.png')}
                        style={styles.boxTopImg(300, 300, 0, -14)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : title})}>
                        <Text style={styles.boxTopTxt('semibold', SIZES.xxLarge + 10, COLORS.lightWhite)}>{ph}</Text>
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/images/explore/line3.png')}
                        style={styles.lineImg(Width, '21%')}
                    />
                </View>
            </ImageBackground>
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
    imageBg : (lebar, tinggi, justifyContent, alignItems) => ({
        width : lebar,
        height : tinggi,
        top : -15,
        justifyContent : justifyContent,
        alignItems : alignItems
    }),
    boxTop : (lebar, top) => ({
        width : lebar,
        height : '54%',
        justifyContent : 'center',
        alignItems : 'center',
        top : top,
    }),
    boxTopImg : (lebar, tinggi, left, marginBottom) => ({
        width : lebar,
        height : tinggi,
        marginBottom : marginBottom,
        left : left
    }),
    boxTopTxt : (fontFamily, size, color) => ({
        fontFamily : fontFamily,
        fontSize : size,
        marginBottom : SIZES.medium,
        color : color
    }),
    lineImg : (lebar, tinggi) => ({
        width : lebar - 13,
        height : tinggi
    }),
    boxBot : (lebar) =>  ({
        width : lebar,
        height : '38%',
        padding : SIZES.large,
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        top : SIZES.large + 33,
    }),
    btnMonitor : {
        flexDirection : 'column',
        alignItems : 'center',
        marginHorizontal : SIZES.large
    },
    txtMonitor : (fontFamily, size, color) => ({
        fontFamily : fontFamily,
        textTransform : 'capitalize',
        fontSize : size,
        marginBottom : SIZES.small - 7,
        color : color
    }),
    imgIcon : {
        width : 93,
        height : 74,
        marginVertical : SIZES.medium - 9
    },
    txtValues : (fontFamily, size, color) => ({
        fontFamily : fontFamily,
        textTransform : 'capitalize',
        fontSize : size,
        marginTop : SIZES.small - 7,
        color : color
    })

})