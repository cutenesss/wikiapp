import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { getFont, getWidth, HEIGHT, WIDTH } from '@configs/functions'
import { navigate } from '@navigation/navigation-service'
import R from '@assets/R'
import RenderHTML from "react-native-render-html"

const ItemWiki = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item?.title}</Text>
      <Button item={item} />
      <RenderHTML contentWidth={getWidth()} source={{ html: item?.snippet }} />
    </View>
  )
}
const onPress = (pageid: string) => {
  navigate('DetailScreen', { pageid })
}

const Button = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        onPress(item?.pageid)
      }}
    >
      <Text style={styles.txtBtn}>Go</Text>
    </TouchableOpacity>
  )
}

export default ItemWiki
const styles = StyleSheet.create({
  btn: {
    backgroundColor: R.colors.gray6,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(4),
    position: 'absolute',
    right: WIDTH(12),
    top: HEIGHT(8)
  },
  container: {
    alignSelf: 'center',
    borderTopWidth: 1,
    paddingLeft: WIDTH(8),
    paddingRight: WIDTH(12),
    paddingVertical: HEIGHT(8),
    width: getWidth()
  },
  text: {
    fontSize: getFont(15),
    fontWeight: '700',
    marginTop: HEIGHT(6)
  },
  txtBtn: {
    fontSize: getFont(16),
    fontWeight: '700'
  }
})
