import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { CheckBox } from "@ui-kitten/components"
import moment from "moment"

// config
import R from "@assets/R"
import { getLineHeight, getFont, HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"
import ItemLabelValue from "./ItemLabelValue"

type Props = {
  textTimeDiemDanh: string
  titleXacNhan?: string
  color?: string
  onPress?: () => void
  disabled?: boolean
  isChecked?: boolean
  customStyle?: any
}

const ViewConfirmAttendance = (props: Props) => {
  const { textTimeDiemDanh, customStyle, titleXacNhan, isChecked, onPress, disabled } = props

  return (
    <View style={[styles.viewDiemDanh, customStyle]}>
      <ItemLabelValue
        label={textTimeDiemDanh}
        value={moment(new Date()).format("DD/MM/YYYY HH:mm")}
        color={R.colors.white}
      />
      <View style={styles.rowDiemDanh}>
        <Text style={styles.label}>{translate("XAC_NHAN_DIEM_DANH")}</Text>
        <CheckBox onChange={onPress} checked={isChecked} disabled={disabled} status="success">
          {titleXacNhan}
        </CheckBox>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  label: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  rowDiemDanh: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: HEIGHT(8),
  },
  viewDiemDanh: {
    paddingHorizontal: WIDTH(16),
  },
})
export default ViewConfirmAttendance
