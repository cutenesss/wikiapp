import React from "react"
import { View, Text } from "react-native"
import { useDispatch, shallowEqual } from "react-redux"
import Modal from "react-native-modal"
import { useSelector } from "@redux/reducers"
import FastImage from "react-native-fast-image"

import { changeDialogContent } from "@redux/actions/dialogStateAction"

import R from "@assets/R"
import styles from "./styles"

import BaseButton from "@components/Buttons/BaseButton"

const CustomDialog: React.FC = () => {
  const dispatch = useDispatch()

  const { isVisible, title, content, onPress } = useSelector(
    (state) => state.dialogStateReducers,
    shallowEqual,
  )

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      isVisible={isVisible}
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
