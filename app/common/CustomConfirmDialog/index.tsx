import React from "react"
import { View, Text } from "react-native"
import { useDispatch, shallowEqual } from "react-redux"
import Modal from "react-native-modal"
import { useSelector } from "@redux/reducers"
import FastImage from "react-native-fast-image"

import { changeDialogConfirmContent } from "@redux/actions/dialogStateAction"

import R from "@assets/R"
import styles from "../CustomDialog/styles"

import BaseButton from "@components/Buttons/BaseButton"
import { translate } from "@i18n"

const CustomConfirmDialog: React.FC = () => {
  const dispatch = useDispatch()

  const { isVisible, title, content, onPress, onPressCancel } = useSelector(
    (state) => state.dialogConfirmStateReducers,
    shallowEqual,
  )

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      onBackdropPress={() => {
        dispatch(
          changeDialogConfirmContent({
            isVisible: false,
            title: "",
            content: "",
            onPress: null,
            onPressCancel: null,
          }),
        )
        onPressCancel && onPressCancel()
      }}
    >
      <View style={styles.content}>
        <FastImage source={R.images.icDialog} style={styles.image} resizeMode="contain" />
        <Text style={styles.textHeader}>{title || ""}</Text>
        <Text style={styles.textContent}>{content || ""}</Text>
        <View style={styles.row}>
          <BaseButton
            customStyleBtn={styles.btn}
            customStyleTitle={styles.text}
            title="OK"
            onPress={() => {
              dispatch(
                changeDialogConfirmContent({
                  isVisible: false,
                  title: "",
                  content: "",
                  onPress: null,
                  onPressCancel: null,
                }),
              )
              onPress && onPress()
            }}
          />
          <BaseButton
            customStyleBtn={styles.btnCancel}
            customStyleTitle={styles.text}
            title={translate("HUY")}
            onPress={() => {
              dispatch(
                changeDialogConfirmContent({
                  isVisible: false,
                  title: "",
                  content: "",
                  onPress: null,
                  onPressCancel: null,
                }),
              )
              onPressCancel && onPressCancel()
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default CustomConfirmDialog
