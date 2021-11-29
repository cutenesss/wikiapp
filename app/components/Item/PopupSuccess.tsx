import React from "react"
import { View, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native"
import { Modal, Text } from "@ui-kitten/components"
import R from "@assets/R"
import { WIDTH, HEIGHT, getFont, getLineHeight } from "@configs/functions"
type Props = {
  visible: boolean
  title: string
  message?: string
  leftText: string
  rightText: string
  leftButton: () => void
  rightButton: () => void
}

/**
 * To show popup like modal. Use as a component (props, state)
 */
const PopupSuccess: React.FC<Props> = (props: Props) => {
  const { visible, title, message, leftButton, leftText, rightButton, rightText } = props
  return (
    <Modal visible={visible} backdropStyle={styles.container} onBackdropPress={leftButton}>
      <View style={styles.content}>
        <StatusBar backgroundColor={R.colors.black50p} />
        {/* <Image source={R.images.CirleCheck} style={styles.icon} resizeMode="contain" /> */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.txcontent}>{message}</Text>}
        </View>
        <View style={styles.bottomButton}>
          <TouchableOpacity onPress={leftButton} style={styles.leftButton}>
            <Text style={styles.leftText}>{leftText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={rightButton} style={styles.rightButton}>
            <Text style={styles.rightText}>{rightText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default PopupSuccess
const styles = StyleSheet.create({
  bottomButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: HEIGHT(25),
    width: WIDTH(310),
  },
  container: {
    backgroundColor: R.colors.black50p,
  },
  content: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(12),
    paddingVertical: HEIGHT(32),
    width: WIDTH(343),
  },
  header: {
    alignItems: "center",
    padding: HEIGHT(5),
  },
  icon: {
    height: WIDTH(80),
    width: WIDTH(80),
  },
  leftButton: {
    alignItems: "center",
    backgroundColor: R.colors.red0,
    borderRadius: HEIGHT(12),
    borderWidth: 0,
    justifyContent: "center",
    minWidth: WIDTH(148),
    paddingVertical: HEIGHT(12),
  },
  leftText: {
    color: R.colors.primary,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  rightButton: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: HEIGHT(12),
    borderWidth: 0,
    justifyContent: "center",
    minWidth: WIDTH(148),
    paddingVertical: HEIGHT(12),
  },
  rightText: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: HEIGHT(3),
  },
  txcontent: {
    fontSize: 14,
    textAlign: "center",
  },
})
