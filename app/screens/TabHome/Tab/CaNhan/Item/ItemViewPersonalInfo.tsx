// @flow
import React from "react"
import { Text, View, Image, StyleSheet } from "react-native"

// config
import R from "@assets/R"
import { getFont, getLineHeight, getWidth, HEIGHT, WIDTH } from "@configs/functions"

// common
import { translate } from "@i18n"

// type
import { IUserInformation } from "@types"
import ItemLabelValue from "@components/Item/ItemLabelValue"
import { GENDER_TYPE } from "@configs/constant"

const ItemViewPersonalInfo = (props: { item: IUserInformation }) => {
  const { item } = props

  const anhDaiDienDefault = R.images.maleAva
  // switch (item?.gioiTinh) {
  //   case GENDER_TYPE.FEMALE:
  //     anhDaiDienDefault = R.images.femaleAva
  //     break
  //   default:
  //     anhDaiDienDefault = R.images.maleAva
  //     break
  // }
  const avatar = anhDaiDienDefault

  return (
    <View style={styles.viewThongTin}>
      <Image resizeMode="cover" source={R.images.logoApp} style={styles.image} />
      <View style={styles.viewAva}>
        <Image resizeMode="cover" source={avatar} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{item?.profile?.fullname ?? translate("TRONG")}</Text>
      <View style={styles.center}>
        <ItemLabelValue
          color={R.colors.white}
          label={translate("LOP")}
          value={item?.role?.organization?.tenDonVi}
        />
      </View>
    </View>
  )
}
export default ItemViewPersonalInfo
const styles = StyleSheet.create({
  avatar: {
    borderRadius: WIDTH(96) / 2,
    height: WIDTH(96),
    width: WIDTH(96),
  },
  center: {
    alignItems: "center",
    alignSelf: "center",
    width: WIDTH(343),
  },
  image: {
    height: HEIGHT(180),
    width: getWidth(),
  },
  name: {
    alignSelf: "center",
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(24),
    fontWeight: "bold",
    lineHeight: getLineHeight(32),
    marginTop: -HEIGHT(45),
  },
  viewAva: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(104) / 2,
    height: WIDTH(104),
    justifyContent: "center",
    overflow: "hidden",
    top: -HEIGHT(50),
    width: WIDTH(104),
    ...R.themes.shadow,
  },
  viewThongTin: {
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(10),
    paddingBottom: HEIGHT(12),
    width: getWidth(),
  },
})
