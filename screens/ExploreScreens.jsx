import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants'

const ExploreScreens = ({ navigation }) => {
    const route = useRoute()
    const {id, title, ph, nitro, fosfor, potas, konduk, temp, lembap, image} = route.params
    console.log(id, title, ph, nitro, fosfor, potas, konduk, temp, lembap, image)
    const [explore, setExplore] = useState('')

    const exploreMenu = [
        { id : 1, title : 'Nitrogen', uri : require('../assets/images/monitor/npk.png'), value : <Text>{Ng}, {Ff}, {Pt}</Text>},
        { id: 2, title: 'Fosfor', uri : require('../assets/images/monitor/tanah.png'), value : <Text>{Sm}, {Sc}, {St}</Text>},
        { id: 3, title: 'Photasium', uri : require('../assets/images/monitor/ph.png'), value : <Text>{Ph}</Text>}
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
      <Image
        source={{uri : image}}
        style={styles.image}
      />
   
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem(0.8)}>
                <Image 
                    source={`item`.uri}
                    style={styles.menuImage}
                />
                <View style={{ width : '50%'}}>
                    <Text style={styles.menuText(0, COLORS.gray, '800', 18)}>{item.title}</Text>
                </View>
                <View style={{ alignSelf : 'flex-end'}}>                            
                    <Text style={styles.menuText(0, COLORS.red, '200', 14)}>{item.value}</Text>                       
                </View>
            </View>
        </TouchableOpacity>
        </View>
      </View>
    </View>

    // <View style={styles.container}>
    //     {
    //         explore === 'npk' ? 
    //         <Text>{`${nitro}, ${fosfor}, ${potas}`}</Text>
    //         :
    //         explore === 'tanah' ?
    //         <Text>{`${lembap}, ${konduk}, ${temp}`}</Text>
    //         :
    //         explore === 'ph' ? 
    //         <Text>{ph}</Text>
    //         : 
    //         <Text>ExploreScreens</Text>
    //     }
    // </View>
  )
}

export default ExploreScreens

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLORS.lightWhite
    },
    image : {
        aspectRatio : 1.8,
        resizeMode : 'cover'
    },
    details : {
        marginTop : -SIZES.large,
        backgroundColor : COLORS.lightWhite,
        borderTopLeftRadius : SIZES.xLarge,
        borderTopRightRadius : SIZES.xLarge
    },
    titleRow : {
        marginHorizontal : 20,
        paddingBottom : SIZES.small,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : SIZES.width -44,
        top : 20
    },
    title : {
        fontFamily : 'bold',
        fontSize : SIZES.large,
        textTransform : 'capitalize'
    },
    menuWrapper : {
        marginTop : SIZES.large,
        width : SIZES.width,
        backgroundColor : COLORS.lightWhite,
        borderRadius : 12
    },
    menuItem :  (borderBottomWidth) => ({
        borderBottomWidth : borderBottomWidth,
        paddingVertical : 15,
        paddingHorizontal : 40,
        borderColor : COLORS.gray,
        flexDirection : 'row',
        
    }),
    menuText : (right, color, fontWeight, fontSize) => ({
        fontFamily : 'regular',
        color : color,
        marginHorizontal : 20,
        fontWeight : fontWeight,
        fontSize : fontSize,
        lineHeight : 36,
        right : right, 
        textTransform : 'capitalize'
    }),
    menuImage : {
        width : 38,
        height : 38
    }
})