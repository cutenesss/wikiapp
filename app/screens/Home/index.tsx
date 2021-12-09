import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import HeaderHome from "./Item/HeaderHome"
import ListFunction from "./Item/ListFunction"
import ModalInfoApp from "./Item/ModalInfoApp"
import ViewWelcome from "./Item/ViewWelcome"

const Home = () => {
  const [modalInfoVisible, setModalInfoVisible] = useState(false)

  const onChangeInfoVisible = (value: boolean) => {
    setModalInfoVisible(value)
  }

  return (
    <View style={styles.container}>
      <HeaderHome onPressUD={() => onChangeInfoVisible(true)} />
      <ViewWelcome />
      <ListFunction />
      <ModalInfoApp isVisible={modalInfoVisible} onChangeModalVisible={onChangeInfoVisible} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {},
})
