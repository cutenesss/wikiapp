import React, { useState, useEffect, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native"
import { useDispatch } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"
import { TabView } from "react-native-tab-view"

// api
import { IResponseLogin } from "@types"
import { getUserProfile } from "@redux/actions/userAction"
import { getDetailInfoClass } from "@apis/functions/class"
import { updateReadNotification } from "@apis/functions/user"
import { refreshNotification } from "@redux/actions/notificationAction"
import { setCurrentClass } from "@redux/actions/currentClass"

import R from "@assets/R"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"
import global from "../../global"

import CustomStatusBar from "@common/CustomStatusBar"
import CaNhan from "./Tab/CaNhan"
import LoadingComponent from "@common/Loading/LoadingComponent"
import TrangChu from "./Tab/TrangChu"

import ScreenName from "@navigation/screen-name"
import { getActiveRouteState } from "@navigation/navigation-service"
import { defaultBody } from "@configs/constant"
import { refreshAlbum } from "@redux/actions/albumAction"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"

type Props = {
  route: {
    params: {
      item: IResponseLogin
      notiId?: string
      _id?: string
      initIndex?: number
    }
  }
}

const TabMain: React.FC<Props> = (props: Props) => {
  const initIndex = props.route.params?.initIndex ?? 0
  const notiId = props.route.params?.notiId
  const item = props.route.params?.item
  const _id = props.route.params?._id

  const dispatch = useDispatch()
  const [currentIndex, setIndex] = useState(initIndex)
  const [loading, setLoading] = useState(true)
  const itemRole = useRef(item)
  const [routes] = useState([
    { key: "1", title: translate("TRANG_CHU") },
    { key: "2", title: translate("CA_NHAN") },
  ])

  useEffect(() => {
    getDetailClass()
    dispatch(refreshAlbum(defaultBody))
    global.isOpened = true
  }, [])

  useEffect(() => {
    onChangeIndex(initIndex)
  }, [initIndex])

  useEffect(() => {
    if (notiId) readNotification()
  }, [notiId])

  const readNotification = async () => {
    try {
      await updateReadNotification(notiId)
      dispatch(refreshNotification(defaultBody))
    } catch (error) {}
  }

  const getDetailClass = async () => {
    dispatch(getUserProfile())
    setLoading(true)
    if (_id) {
      const listRole: any = await AsyncStorageUtils.getObject(AsyncStorageUtils.KEY.USER_DATA)
      const role = listRole?.find((role) => role?.role?._id === _id)
      itemRole.current = role
    }
    try {
      const res = await getDetailInfoClass(itemRole.current?.role?.organizationId)
      dispatch(setCurrentClass(res.data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const goToTabTienIch = () => {
    onChangeIndex(1)
  }

  const onChangeIndex = (index: number) => {
    setIndex(index)
  }

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "1":
        return <TrangChu item={itemRole.current} goToTabTienIch={goToTabTienIch} />
      case "2":
        return <CaNhan />
      default:
        return null
    }
  }

  const renderTabBar = () => {
    return (
      <View style={styles.tabContainer}>
        <FlatList
          data={routes}
          numColumns={5}
          scrollEnabled={false}
          keyExtractor={(item) => `TAB_HOME_${item?.title}`}
          columnWrapperStyle={styles.row}
          removeClippedSubviews={true}
          renderItem={({ item, index }) => {
            const isFocused = currentIndex === index
            const color = isFocused ? R.colors.primary : R.colors.gray5
            return (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => onChangeIndex(index)}
                style={styles.flex}
              >
                <Icon name={getIcon(index)} size={WIDTH(20)} color={color} />
                <Text style={[styles.text, { color }]}>{item.title}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }

  const backgroundColor =
    getActiveRouteState() === ScreenName.TabHome && currentIndex === 0
      ? R.colors.header
      : R.colors.white

  const barStyle =
    getActiveRouteState() === ScreenName.TabHome && currentIndex === 0
      ? "light-content"
      : "dark-content"

  if (loading) {
    return <LoadingComponent isLoading={loading} />
  } else {
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{
            index: currentIndex,
            routes,
          }}
          renderScene={renderScene}
          swipeEnabled={false}
          tabBarPosition="bottom"
          onIndexChange={(index: number) => setIndex(index)}
        />
      </View>
    )
  }
}

export default TabMain

const getIcon = (index: number) => {
  switch (index) {
    case 0:
      return "ios-home-sharp"
    case 1:
      return "person-circle-outline"
    default:
      return "person-circle-outline"
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.gray0,
    flex: 1,
  },
  flex: {
    alignItems: "center",
    flex: 1,
  },
  row: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "space-around",
  },
  tabContainer: {
    backgroundColor: R.colors.gray0,
    paddingTop: HEIGHT(12),
  },
  text: {
    color: R.colors.gray5,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(12),
    fontWeight: "500",
    lineHeight: getLineHeight(16),
    paddingBottom: HEIGHT(16),
    paddingTop: HEIGHT(5),
  },
})
