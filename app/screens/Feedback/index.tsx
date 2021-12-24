import React, { useRef, useState } from "react"
import { View } from "react-native"
import { Text } from "@ui-kitten/components"
import { TabBar, TabView } from "react-native-tab-view"

// config
import { translate } from "@i18n"
import R from "@assets/R"

// common
import HeaderBack from "@components/Headers/HeaderBack"

// style
import styles from "./styles"

const Feedback = () => {
  const [index, setIndex] = useState(0)

  const routes = useRef([
    { key: "1", title: translate("PHAN_ANH_QUANH_DAY").toUpperCase() },
    { key: "2", title: translate("TAO_PHAN_ANH_MOI").toUpperCase() },
    { key: "3", title: translate("PHAN_ANH_DA_GUI").toUpperCase() },
  ])

  const renderLabel = ({ route, focused }) => {
    const color = focused ? R.colors.primary : R.colors.white
    return (
      <Text category={"h5"} style={[styles.labelStyle, { color }]}>
        {route.title}
      </Text>
    )
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicatorStyle}
      renderLabel={renderLabel}
    />
  )

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "1":
        return <View />
      case "2":
        return <View />
      case "3":
        return <View />
      default:
        return <View />
    }
  }

  const onIndexChange = (index: number) => {
    setIndex(index)
  }

  return (
    <View style={styles.container}>
      <HeaderBack title={translate("PHAN_ANH_DO_THI")} />
      <TabView
        onIndexChange={onIndexChange}
        navigationState={{
          index,
          routes: routes.current,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}
export default Feedback
