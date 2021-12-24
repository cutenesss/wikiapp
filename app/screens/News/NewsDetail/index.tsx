import React from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text, Layout } from "@ui-kitten/components"
import RenderHtml from "react-native-render-html"
import FastImage from "react-native-fast-image"
import DeviceInfo from "react-native-device-info"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useDispatch } from "react-redux"
import { useSelector } from "@redux/reducers"
import moment from "moment"

import { postBookmarkNews } from "@apis/functions/user"
import STATUS from "@apis/status"
import { refreshListAction } from "@redux/actions/refreshListAction"
import { ItemBodyNews } from "@types"

import { translate } from "@i18n"
import R from "@assets/R"
import { getWidth, HEIGHT, WIDTH } from "@configs/functions"
import { showToast, TypeToast } from "@common/Notification"

import HeaderBack from "@components/Headers/HeaderBack"

interface Props {
  route: {
    params: {
      item: ItemBodyNews
    }
  }
}

const NewsDetail = (props: Props) => {
  const item = props?.route?.params?.item
  return (
    <Layout style={styles.container}>
      <HeaderBack title={translate("BANG_TIN")} />
      <HeaderItem item={item} />
      <ViewContent item={item} />
    </Layout>
  )
}

const ViewContent = ({ item }: { item: ItemBodyNews }) => {
  const source = {
    html: item?.msg_content,
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={styles.viewTitle}>
        <Text category={"label"} style={styles.txtTitle}>{`${translate("NGUOI_GUI")}: ${
          item?.from ?? ""
        }`}</Text>
        <View style={styles.gap} />
        <Text category={"label"} style={styles.txtTitle}>{`${moment(item?.created_time).format(
          "HH:mm:ss",
        )} - ${moment(item?.created_time).format("DDD")} - ${moment(item?.created_time).format(
          "DD/MM/YYYY",
        )}`}</Text>
      </View>
      <FastImage source={R.images.iconImageNews} resizeMode="contain" style={styles.img} />
      <View style={styles.viewHTML}>
        <RenderHtml contentWidth={WIDTH(343)} source={source} />
      </View>
    </ScrollView>
  )
}
const HeaderItem = ({ item }: { item: ItemBodyNews }) => {
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
    <View style={styles.header}>
      <Text category={"h6"} style={styles.txtTitle}>
        {item?.msg_subject}
      </Text>
      <TouchableOpacity hitSlop={R.themes.hitSlop} onPress={onPressBookmark}>
        <Ionicons
          size={WIDTH(25)}
          name={item?.is_bookmark ? "bookmark" : "ios-bookmark-outline"}
          color={R.colors.black0}
        />
      </TouchableOpacity>
    </View>
  )
}

export default NewsDetail
const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.whiteF2,
    flex: 1,
  },
  gap: {
    height: HEIGHT(8),
  },
  header: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(16),
    width: getWidth(),
  },
  img: {
    alignSelf: "center",
    height: WIDTH(175),
    width: WIDTH(175),
  },
  txtTitle: {
    fontWeight: "bold",
  },
  viewHTML: {
    alignSelf: "center",
    width: WIDTH(343),
  },
  viewTitle: {
    marginVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    width: getWidth(),
  },
})
