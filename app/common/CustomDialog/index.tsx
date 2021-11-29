import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { useDispatch, shallowEqual } from "react-redux"
import { Modal } from "@ui-kitten/components"
import { useSelector } from "@redux/reducers"
import FastImage from "react-native-fast-image"

import { changeDialogContent } from "@redux/actions/dialogStateAction"

import R from "@assets/R"
import { WIDTH, HEIGHT, getFont, getLineHeight } from "@configs/functions"

import BaseButton from "@components/Buttons/BaseButton"

const CustomDialog: React.FC = () => {
  const dispatch = useDispatch()

  const { isVisible, title, content, onPress } = useSelector(
    (state) => state.dialogStateReducers,
    shallowEqual,
  )

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.container}
      onBackdropPress={() => {
        dispatch(changeDialogContent({ isVisible: false, title: "", content: "", onPress: null }))
        onPress && onPress()
      }}
    >
      <View style={styles.content}>
        <FastImage source={R.images.icDialog} style={styles.image} resizeMode="contain" />
        <Text style={styles.textHeader}>{title || ""}</Text>
        <Text style={styles.textContent}>{content || ""}</Text>
        <BaseButton
          customStyleBtn={styles.btn}
          customStyleTitle={styles.text}
          title="OK"
          onPress={() => {
            dispatch(
              changeDialogContent({ isVisible: false, title: "", content: "", onPress: null }),
            )
            onPress && onPress()
          }}
        />
      </View>
    </Modal>
  )
}

export default CustomDialog

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: WIDTH(12),
    justifyContent: "center",
    marginVertical: HEIGHT(32),
    width: WIDTH(148),
  },
  container: {
    backgroundColor: R.colors.black50p,
  },
  content: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(12),
    width: WIDTH(343),
  },
  image: {
    alignSelf: "center",
    height: WIDTH(81),
    marginBottom: HEIGHT(24),
    marginTop: HEIGHT(32),
    width: WIDTH(81),
  },
  text: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(18),
    fontWeight: "bold",
    lineHeight: getLineHeight(24),
  },
  textContent: {
    alignSelf: "center",
    color: R.colors.gray9,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
    marginTop: HEIGHT(8),
    textAlign: "center",
    width: WIDTH(311),
  },
  textHeader: {
    color: R.colors.gray9,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(20),
    fontWeight: "bold",
    lineHeight: getLineHeight(28),
    marginHorizontal: WIDTH(20),
    textAlign: "center",
  },
})
