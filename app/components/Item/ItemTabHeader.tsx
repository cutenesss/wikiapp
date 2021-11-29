import * as React from "react"
import { View, StyleSheet, FlatList } from "react-native"

import { translate } from "@i18n"
import BaseButton from "@components/Buttons/BaseButton"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"

const DATA_LIST = [
  translate("DIEM_DANH_DAU_GIO"),
  translate("DIEM_DANH_LAI"),
  translate("DIEM_DANH_CUOI_GIO"),
]

type Props = {
  type: number
  data?: Array<string>
  paddingHorizontal?: number
}

const ItemTabHeader = (props: Props) => {
  const { type, data, paddingHorizontal } = props
  return (
    <FlatList
      data={data || DATA_LIST}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={[styles.rowList, { paddingHorizontal: paddingHorizontal || WIDTH(4) }]}
      style={styles.list}
      renderItem={({ item, index }) => {
        const backgroundColor = type === index ? R.colors.primary : R.colors.gray6
        if (item === "") return <View />
        else {
          return (
            <BaseButton
              title={item}
              customStyleBtn={[styles.btn, { backgroundColor }]}
              customStyleTitle={styles.txt}
              disabled={true}
            />
          )
        }
      }}
    />
  )
}
export default ItemTabHeader
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: WIDTH(6),
    width: null,
  },
  list: {
    flexGrow: 0,
    paddingBottom: HEIGHT(15),
  },
  rowList: {
    justifyContent: "space-between",
  },
  txt: {
    fontSize: getFont(13),
    lineHeight: getLineHeight(18),
  },
})
