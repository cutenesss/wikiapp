import React from "react"
import { StyleSheet, TouchableOpacity, Image } from "react-native"
import { List, Text } from "@ui-kitten/components"

import { getWidth, HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"
import { translate } from "@i18n"
import ScreenName from "@navigation/screen-name"
import { navigate } from "@navigation/navigation-service"

const DATA_LIST = [
  {
    title: translate("BANG_TIN"),
    image: R.images.iconBangTin,
    destination: ScreenName.News,
  },
  {
    title: translate("PHAN_ANH_DO_THI"),
    image: R.images.iconPhanAnh,
    destination: ScreenName.Feedback,
  },
  {
    title: translate("XIN_Y_KIEN_CU_DAN"),
    image: R.images.iconXinYKienCuDan,
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("GHI_CHU_CA_NHAN"),
    image: R.images.iconGhiChuCaNhan,
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("SU_KIEN_DIA_DANH"),
    image: R.images.iconSuKien,
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("TRA_CUU_DICH_VU_CONG"),
    image: R.images.iconDichVu,
    destination: ScreenName.ThongBao,
  },
]

const ListFunction = () => {
  const onPressItem = (item) => {
    navigate(item?.destination)
  }

  return (
    <List
      data={DATA_LIST}
      keyExtractor={(item) => item.title}
      numColumns={3}
      bounces={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
      style={styles.list}
      renderItem={({ item }) => <ViewItem item={item} onPress={() => onPressItem(item)} />}
    />
  )
}

const ViewItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.viewItem}>
    <Image source={item?.image} resizeMode="contain" style={styles.viewIcon} />
    <Text category="label" style={styles.txt}>
      {item?.title}
    </Text>
  </TouchableOpacity>
)

export default ListFunction
const styles = StyleSheet.create({
  list: {
    backgroundColor: R.colors.transparent,
    flexGrow: 0,
    marginTop: -HEIGHT(40),
    paddingHorizontal: WIDTH(12),
    width: getWidth(),
    zIndex: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  txt: {
    color: R.colors.green700,
    fontWeight: "bold",
    marginTop: HEIGHT(8),
    textAlign: "center",
    textTransform: "uppercase",
  },
  viewIcon: {
    height: WIDTH(90),
    width: WIDTH(90),
  },
  viewItem: {
    alignItems: "center",
    width: WIDTH(100),
  },
})
