import React from "react"
import { View, StyleSheet, TouchableOpacity, TextStyle } from "react-native"
import FastImage, { Source, ImageStyle } from "react-native-fast-image"
import { Modal, Text } from "@ui-kitten/components"
import R from "@assets/R"
import { WIDTH, HEIGHT, getFont } from "@configs/functions"
import { translate } from "@i18n"
type Props = {
  visible: boolean
  config: {
    image: Source
    title: string
    description: string
    leftText?: string
    rightText?: string
  }
  onRightText: () => void
  onLeftText: () => void
  sameRow?: boolean
  customTitleStyle?: TextStyle
  customImageStyle?: ImageStyle
}

const BaseModal: React.FC<Props> = (props: Props) => {
  const { visible, onLeftText, onRightText, config, sameRow, customTitleStyle, customImageStyle } =
    props

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <View style={styles.container}>
        <View style={sameRow && styles.row}>
          <FastImage
            source={config.image}
            style={[styles.image, customImageStyle]}
            resizeMode="contain"
          />
          <Text style={[styles.title, customTitleStyle]}>{config.title}</Text>
        </View>
        <Text style={styles.content}>{config.description}</Text>
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={onLeftText} style={styles.btnCancel}>
            <Text style={styles.textCancel}>{config.leftText || translate("HUY")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRightText} style={styles.btnAccept}>
            <Text style={styles.textAccept}>{config.rightText || translate("DONG_Y")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default BaseModal
const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: R.colors.black50p,
  },
  btnAccept: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: WIDTH(12),
    justifyContent: "center",
    paddingVertical: HEIGHT(12),
    width: WIDTH(148),
  },
  btnCancel: {
    alignItems: "center",
    backgroundColor: R.colors.red0,
    borderRadius: WIDTH(12),
    justifyContent: "center",
    paddingVertical: HEIGHT(12),
    width: WIDTH(148),
  },
  container: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(12),
    padding: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(32),
    width: WIDTH(341),
  },
  content: {
    color: R.colors.gray9,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    marginBottom: HEIGHT(32),
    textAlign: "center",
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    alignSelf: "center",
    height: WIDTH(80),
    marginBottom: HEIGHT(24),
    width: WIDTH(80),
  },
  row: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  textAccept: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(18),
  },
  textCancel: {
    color: R.colors.primary,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(18),
  },
  title: {
    color: R.colors.gray9,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(20),
    marginBottom: HEIGHT(8),
    textAlign: "center",
  },
})
