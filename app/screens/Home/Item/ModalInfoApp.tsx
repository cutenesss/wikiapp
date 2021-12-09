import React from "react"
import { StyleSheet, View, Linking } from "react-native"
import { Text } from "@ui-kitten/components"
import VersionCheck from "react-native-version-check"
import Modal from "react-native-modal"

import R from "@assets/R"
import { HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"

interface Props {
  isVisible: boolean
  onChangeModalVisible: (value: boolean) => void
}

const ModalInfoApp = (props: Props) => {
  const { isVisible, onChangeModalVisible } = props

  const onPressPhone = () => {
    Linking.openURL(`tel:${R.strings.phone}`)
  }

  const currentBuild = VersionCheck.getCurrentVersion()

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={() => onChangeModalVisible && onChangeModalVisible(false)}
      onBackdropPress={() => onChangeModalVisible && onChangeModalVisible(false)}
    >
      <View style={styles.container}>
        <Text category="h1" style={styles.header}>
          {translate("UNG_DUNG_EZ")}
        </Text>
        <Text category="h4" style={styles.title}>
          {translate("TITLE_UNG_DUNG_EZ")}
        </Text>
        <Text category="h4" style={styles.ver}>{`${translate("PHIEN_BAN")} ${currentBuild}`}</Text>
        <Text category="h4" style={styles.phone} onPress={onPressPhone}>{`${translate(
          "DIEN_THOAI_HO_TRO",
        )}: ${R.strings.phone}`}</Text>
      </View>
    </Modal>
  )
}
export default ModalInfoApp

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.gray0,
    borderRadius: WIDTH(8),
    paddingVertical: HEIGHT(32),
  },
  header: {
    alignSelf: "center",
    color: R.colors.blue0084,
    marginBottom: HEIGHT(12),
  },
  phone: {
    alignSelf: "center",
    color: R.colors.borderA1,
  },
  title: {
    alignSelf: "center",
    color: R.colors.borderA1,
    marginBottom: HEIGHT(60),
  },
  ver: {
    alignSelf: "center",
    color: R.colors.borderA1,
    marginBottom: HEIGHT(12),
  },
})
