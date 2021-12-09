import React from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Text } from "@ui-kitten/components"

import { getWidth, HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"
import { translate } from "@i18n"
import ScreenName from "@navigation/screen-name"

const DATA_LIST = [
  {
    title: translate("THONG_BAO"),
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("PHAN_ANH_DO_THI"),
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("XIN_Y_KIEN_CU_DAN"),
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("GHI_CHU_CA_NHAN"),
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("SU_KIEN_DIA_DANH"),
    destination: ScreenName.ThongBao,
  },
  {
    title: translate("TRA_CUU_DICH_VU_CONG"),
    destination: ScreenName.ThongBao,
  },
]

const ListFunction = () => {
  const onPressItem = (index: number) => {
    switch (index) {
      case 0:
        break

      default:
        break
    }
  }

  return (
    <FlatList
      data={DATA_LIST}
      keyExtractor={(item) => item.title}
      numColumns={3}
      bounces={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
      style={styles.list}
      renderItem={({ item, index }) => <ViewItem item={item} onPress={() => onPressItem(index)} />}
    />
  )
}

const ViewItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.viewItem}>
    <View style={styles.viewIcon} />
    <Text category="p1" style={styles.txt}>
      {item?.title}
    </Text>
  </TouchableOpacity>
)

export default ListFunction
const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    paddingHorizontal: WIDTH(12),
    width: getWidth(),
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
    alignItems: "center",
    backgroundColor: R.colors.lime700,
    borderColor: R.colors.white,
    borderRadius: WIDTH(90),
    borderWidth: WIDTH(5),
    height: WIDTH(90),
    justifyContent: "center",
    width: WIDTH(90),
    ...R.themes.shadow,
  },
  viewItem: {
    alignItems: "center",
    width: WIDTH(100),
  },
})
