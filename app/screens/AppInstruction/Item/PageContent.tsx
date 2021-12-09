import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "@ui-kitten/components"

import { ItemPager } from "@types"
import { HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"

import CustomStatusBar from "@common/CustomStatusBar"

interface PageContentProps {
  item: ItemPager
}

const PageContent = (props: PageContentProps) => {
  const { item } = props
  return (
    <View style={[styles.container, { backgroundColor: item?.color }]}>
      <CustomStatusBar backgroundColor={R.colors.transparent} barStyle="light-content" />
      {item?.icon}
      <View style={styles.viewTitle}>
        <Text category="h2" style={styles.title}>
          {item?.title ?? ""}
        </Text>
      </View>
      <View style={styles.viewContent}>
        <Text category="p1" style={styles.content}>
          {item?.content ?? ""}
        </Text>
      </View>
    </View>
  )
}

export default PageContent

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    color: R.colors.white,
    textAlign: "center",
  },
  title: {
    alignSelf: "center",
    color: R.colors.white,
    fontWeight: "bold",
  },
  viewContent: {
    marginHorizontal: WIDTH(16),
  },
  viewTitle: {
    marginVertical: HEIGHT(16),
  },
})
