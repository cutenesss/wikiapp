import React, { useEffect, useState, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { useSelector } from "@redux/reducers"
import { useDispatch } from "react-redux"
import DeviceInfo from "react-native-device-info"
import Geolocation from "@react-native-community/geolocation"

import { getAuthorityInfoAction } from "@redux/actions/getAuthorityInfoAction"

import HeaderHome from "./Item/HeaderHome"
import ListFunction from "./Item/ListFunction"
import ModalInfoApp from "./Item/ModalInfoApp"
import ModalCallHotLine from "./Item/ModalCallHotLine"
import ViewWelcome from "./Item/ViewWelcome"
import { getUserProfile } from "@redux/actions/userAction"

const Home = () => {
  const dispatch = useDispatch()
  const { initState, loading } = useSelector((state) => state.initStateReducers)
  const [modalInfoVisible, setModalInfoVisible] = useState(false)
  const [modalPhoneVisible, setModalPhoneVisible] = useState(false)
  const intervalUsedTime = useRef(null)

  useEffect(() => {
    if (loading === false) {
      onHandleUpdatePosition()
      if (initState?.is_login === 1) {
        dispatch(getUserProfile(initState?.session_id))
      }
    }
  }, [loading])

  const onHandleUpdatePosition = () => {
    clearInterval(intervalUsedTime.current)
    intervalUsedTime.current = setInterval(async () => {
      // console.log("===>>countCallApi", countCallApi)
      // 30 se update 1 lan vi tri
      Geolocation.getCurrentPosition(
        // Will give you the current location
        async (position) => {
          const deviceId = DeviceInfo.getUniqueId()
          // getting the Longitude from the location json
          const currentLongitude = JSON.stringify(position.coords.longitude)

          // getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude)

          const body = {
            session_id: initState?.session_id,
            device_id: deviceId,
            l3_name: "",
            l2_name: "",
            lat: currentLatitude,
            lng: currentLongitude,
          }
          console.log("áaa", position)
          // dispatch(getAuthorityInfoAction(body))
        },
        () => {
          // console.log(error.message)
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000,
        },
      )
    }, 60000)
  }

  const onChangeInfoVisible = (value: boolean) => {
    setModalInfoVisible(value)
  }

  const onChangePhoneVisible = (value: boolean) => {
    setModalPhoneVisible(value)
  }

  return (
    <View style={styles.container}>
      <HeaderHome onPressUD={() => onChangeInfoVisible(true)} />
      <ViewWelcome onPressPhone={() => onChangePhoneVisible(true)} />
      <ListFunction />
      <ModalInfoApp isVisible={modalInfoVisible} onChangeModalVisible={onChangeInfoVisible} />
      <ModalCallHotLine isVisible={modalPhoneVisible} onChangeModalVisible={onChangePhoneVisible} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {},
})
