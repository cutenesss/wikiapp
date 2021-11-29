import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

// config
import { translate } from "@i18n"
import R from "@assets/R"
import { getFont, getLineHeight, HEIGHT, WIDTH, popupOk } from "@configs/functions"

// common
import IconSVG from "@components/Icons/IconSVG"
import ScreenName from "@navigation/screen-name"
import { navigate, reset } from "@navigation/navigation-service"

// type

type Props = {
  item: any
  onPress?: () => void
}
const goToDetailScreen = (title: string) => {
  switch (title) {
    case translate("DOI_VAI_TRO"):
      reset(ScreenName.ChonVaiTro)
      break
    case translate("CAP_NHAT_THONG_TIN_CA_NHAN"):
      navigate(ScreenName.ChangeInformation)
      break
    case translate("CAP_NHAT_THONG_TIN_CON"):
      navigate(ScreenName.DoiThongTinCon)
      break
    default:
      break
  }
}
const ItemListTabHome = (props: Props) => {
  const { item, onPress } = props

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => goToDetailScreen(item?.title)}
    >
      <View style={styles.row}>
        <IconSVG iconName={item?.title ?? ""} />
        <Text style={styles.text}>{`${item?.title ?? ""}`}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="right" size={WIDTH(15)} color={R.colors.primary} />
      </View>
    </TouchableOpacity>
  )
}
export default ItemListTabHome
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: HEIGHT(16),
    width: WIDTH(311),
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    fontWeight: "500",
    lineHeight: getLineHeight(24),
    marginLeft: HEIGHT(17),
  },
})
