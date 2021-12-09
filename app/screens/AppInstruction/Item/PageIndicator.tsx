import React from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { getWidth, HEIGHT, WIDTH } from "@configs/functions"
import { Text } from "@ui-kitten/components"

import { ItemPager } from "@types"
import { translate } from "@i18n"
import R from "@assets/R"

interface PageIndicatorProps {
  data: Array<ItemPager>
  currentPage: number
  onChangePage: (value: boolean) => void
}

const PageIndicator = (props: PageIndicatorProps) => {
  const { data, currentPage, onChangePage } = props
  return (
    <View style={styles.container}>
      <ButtonAction title={translate("BO_QUA")} onPress={() => onChangePage(false)} />
      <FlatList
        data={data}
        keyExtractor={(item) => item?.title}
        scrollEnabled={false}
        horizontal={true}
        style={styles.list}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const backgroundColor = index === currentPage ? R.colors.white : R.colors.border
          return <View style={[styles.dot, { backgroundColor }]} />
        }}
      />
      <ButtonAction
        title={translate(currentPage === data?.length - 1 ? "TRANG_CHU" : "TIEP_THEO")}
        onPress={() => onChangePage(true)}
      />
    </View>
  )
}

const ButtonAction = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.btn}>
    <Text category="p1" style={styles.txt}>
      {title}
    </Text>
  </TouchableOpacity>
)

export default PageIndicator

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    minWidth: WIDTH(60),
  },
  container: {
    alignItems: "center",
    borderTopColor: R.colors.white,
    borderTopWidth: HEIGHT(1),
    bottom: HEIGHT(16),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(8),
    paddingTop: HEIGHT(16),
    position: "absolute",
    width: getWidth(),
  },
  dot: {
    borderRadius: WIDTH(12),
    height: WIDTH(12),
    marginHorizontal: WIDTH(4),
    width: WIDTH(12),
  },
  list: {
    flexGrow: 0,
  },
  txt: {
    color: R.colors.white,
    fontWeight: "700",
  },
})
