import React, { useRef } from "react"
import { View } from "react-native"
import { Text } from "@ui-kitten/components"
import { TabBar, TabView } from "react-native-tab-view"
import { shallowEqual } from "react-redux"
import { useSelector } from "@redux/reducers"

// config
import { translate } from "@i18n"
import R from "@assets/R"

// common
import HeaderBack from "@components/Headers/HeaderBack"
import TabContent from "./TabContent"

// style
import styles from "./styles"

const News = () => {
  const { initState } = useSelector((state) => state.initStateReducers, shallowEqual)
  const [index, setIndex] = React.useState(0)

  const routes = useRef(
    initState?.session_id
      ? [{ key: "1", title: translate("TIN_VANG_LAI").toUpperCase() }]
      : [
          { key: "1", title: translate("TIN_VANG_LAI").toUpperCase() },
          { key: "2", title: translate("TIN_THUONG_TRU").toUpperCase() },
        ],
  )

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
        return <TabContent currentIndex={index} />
      case "2":
        return <TabContent currentIndex={index} />
      default:
        return <View />
    }
  }

  const onIndexChange = (index: number) => {
    setIndex(index)
  }

  return (
    <View style={styles.container}>
      <HeaderBack title={translate("BANG_TIN")} />
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
export default News
