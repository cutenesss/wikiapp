import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "@ui-kitten/components"
import FastImage from "react-native-fast-image"
import DeviceInfo from "react-native-device-info"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useSelector } from "@redux/reducers"
import { useDispatch } from "react-redux"
import moment from "moment"

import { postBookmarkNews } from "@apis/functions/user"
import STATUS from "@apis/status"
import { refreshListAction } from "@redux/actions/refreshListAction"

import { ItemBodyNews } from "@types"

import R from "@assets/R"
import { HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"
import { showToast, TypeToast } from "@common/Notification"
import { navigate } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"

interface Props {
  item: ItemBodyNews
}

const ItemNews = (props: Props) => {
  const { item } = props

  const onPress = () => {
    navigate(ScreenName.NewsDetail, { item })
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
      <FastImage source={R.images.iconImageNews} resizeMode="contain" style={styles.img} />
      <ViewContent item={item} />
      <ViewIcon item={item} />
    </TouchableOpacity>
  )
}

const ViewContent = ({ item }: { item: ItemBodyNews }) => (
  <View style={styles.viewContent}>
    <Text category={"h4"} style={styles.txtTitle}>
      {item?.msg_subject}
    </Text>
    <View style={styles.gap} />
    <Text category={"label"} style={styles.txtFrom}>{`${translate("NGUOI_GUI")}: ${
      item?.from
    }`}</Text>
    <View style={styles.gap} />
    <Text category={"label"} style={styles.txtTitle}>{`${moment(item?.created_time).format(
      "HH:mm:ss",
    )} - ${moment(item?.created_time).format("DDD")} - ${moment(item?.created_time).format(
      "DD/MM/YYYY",
    )}`}</Text>
  </View>
)

const ViewIcon = ({ item }: { item: ItemBodyNews }) => {
  const dispatch = useDispatch()
  const { initState } = useSelector((state) => state.initStateReducers)

  const onPressBookmark = async () => {
    const deviceId = await DeviceInfo.getUniqueId()
    const body = {
      device_id: deviceId,
      message_id: item?.id,
      session_id: initState?.session_id,
    }
    try {
      const res = await postBookmarkNews(body)
      if (res?.code === STATUS.SUCCESS) {
        dispatch(refreshListAction())
        showToast({
          title: translate("notice_t"),
          message: translate(res?.is_bookmark ? "BOOKMARK_THANH_CONG" : "XOA_BOOKMARK_THANH_CONG"),
          type: TypeToast.SUCCESS_BUG,
        })
      } else throw new Error(JSON.stringify(res))
    } catch (error) {
      // console.log('errrr', error)
    }
  }

  return (
    <TouchableOpacity hitSlop={R.themes.hitSlop} style={styles.rowIcon} onPress={onPressBookmark}>
      <Ionicons
        size={WIDTH(25)}
        name={item?.is_bookmark ? "bookmark" : "ios-bookmark-outline"}
        color={R.colors.black0}
      />
    </TouchableOpacity>
  )
}

export default ItemNews
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(4),
    flexDirection: "row",
    marginBottom: HEIGHT(16),
    paddingVertical: HEIGHT(8),
    width: WIDTH(343),
  },
  gap: {
    height: HEIGHT(8),
  },
  img: {
    height: WIDTH(60),
    marginHorizontal: WIDTH(12),
    width: WIDTH(60),
  },
  rowIcon: {
    position: "absolute",
    right: WIDTH(8),
    top: HEIGHT(6),
  },
  txtFrom: {
    color: R.colors.border,
  },
  txtTitle: {
    fontWeight: "bold",
  },
  viewContent: {
    width: WIDTH(240),
  },
})
