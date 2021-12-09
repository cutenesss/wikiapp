import React from "react"
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { Text } from "@ui-kitten/components"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from "react-native-vector-icons/Feather"

import { HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"
import { translate } from "@i18n"
import { navigate } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"

const ViewWelcome = () => {
  return (
    <View style={styles.container}>
      <ViewUser />
      <ViewContent />
    </View>
  )
}

const ViewUser = () => {
  const onPress = () => {
    navigate(ScreenName.Login)
  }
  return (
    <TouchableOpacity style={styles.viewUser} onPress={onPress}>
      <Icon size={WIDTH(30)} name="account-circle" color={R.colors.black0} />
      <Text category="p1" style={styles.txtUser}>
        KHACH
      </Text>
    </TouchableOpacity>
  )
}

const ViewContent = () => {
  const onPressPhone = () => {
    Linking.openURL(`tel:${R.strings.phone}`)
  }
  return (
    <View style={styles.viewContent}>
      <TouchableOpacity onPress={onPressPhone} style={styles.viewIcon}>
        <Feather size={WIDTH(40)} name="phone-call" color={R.colors.white} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text category="h3" style={styles.txtHeader}>
          {translate("CHINH_QUYEN")}
        </Text>
        <Text category="p1" style={styles.txtContent}>
          {translate("KINH_CHAO_QUY_KHACH")}
        </Text>
      </View>
    </View>
  )
}
export default ViewWelcome
const styles = StyleSheet.create({
  container: {
    height: HEIGHT(220),
    marginBottom: HEIGHT(24),
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: WIDTH(40),
    width: WIDTH(250),
  },
  txtContent: {
    alignSelf: "center",
  },
  txtHeader: {
    textAlign: "center",
  },
  txtUser: {
    color: R.colors.black0,
    marginLeft: WIDTH(4),
  },
  viewContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: WIDTH(16),
    marginTop: HEIGHT(30),
  },
  viewIcon: {
    alignItems: "center",
    backgroundColor: R.colors.lime700,
    borderColor: R.colors.white,
    borderRadius: WIDTH(75),
    borderWidth: WIDTH(5),
    height: WIDTH(75),
    justifyContent: "center",
    marginLeft: WIDTH(16),
    width: WIDTH(75),
    ...R.themes.shadow,
  },
  viewUser: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: WIDTH(16),
    marginTop: HEIGHT(24),
  },
})
