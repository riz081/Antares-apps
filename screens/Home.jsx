import { TouchableOpacity, Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { Ionicons,Fontisto } from "@expo/vector-icons";
import { SIZES, COLORS, SHADOW } from '../constants';
import { MenuComponents } from '../components';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Text style={styles.user_name}>Nama User</Text>
        </View>
        <View style={styles.menuContainer}>
          <MenuComponents/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  appBarWrapper : {
    marginHorizontal : 22,
    marginTop : SIZES.xLarge,
  },
  appBar : {
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems : 'center'
  },
  menuContainer : {
    marginTop : '5%'
  },
  user_name : {
    fontFamily : 'semibold',
    fontSize : SIZES.medium -2,
    color : COLORS.gray
  },
})


