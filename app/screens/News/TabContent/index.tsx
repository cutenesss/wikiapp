import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { List } from "@ui-kitten/components"
import DeviceInfo from "react-native-device-info"
import { shallowEqual } from "react-redux"
import { useSelector } from "@redux/reducers"

import { getNewsInLocalArea } from "@apis/functions/user"
import STATUS from "@apis/status"

import { getWidth, HEIGHT } from "@configs/functions"
import R from "@assets/R"
import { translate } from "@i18n"

import ItemNews from "./Item/ItemNews"
import ItemTrong from "@components/Item/ItemTrong"
import LoadingComponent from "@common/Loading/LoadingComponent"

interface Props {
  currentIndex: number
}

const TabContent = (props: Props) => {
  const { currentIndex } = props
  const { refresh } = useSelector((state) => state.refreshListReducers, shallowEqual)
  const { initState } = useSelector((state) => state.initStateReducers, shallowEqual)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefresh] = React.useState(false)

  useEffect(() => {
    if (currentIndex === 1) {
      getNewsLocal()
    } else {
      setData([])
    }
  }, [refresh, currentIndex])

  const getNewsLocal = () => {
    setLoading(true)
    getNewsData()
    setLoading(false)
  }

  const getNewsData = async () => {
    const deviceId = DeviceInfo.getUniqueId()
    try {
      const body = {
        device_id: deviceId,
        session_id: initState?.session_id,
      }
      const res = await getNewsInLocalArea(body)
      if (res?.code === STATUS.SUCCESS) {
        // setData([
        //   {
        //     is_read: 0,
        //     created_time: "2021-12-03 11:55:04",
        //     total_like: 0,
        //     is_violated: 0,
        //     is_like: false,
        //     msg_content: "<p>Th&ocirc;ng b&aacute;o tiếp tục ti&ecirc;m vacxin</p>\n",
        //     from: "Mộ Lao-Hà Đông",
        //     id: 19178,
        //     is_bookmark: false,
        //     msg_subject: "Thông báo tiếp tục tiêm vacxin",
        //     read_count: 3,
        //   },
        // ])
        setData(res?.resident_message_list ?? [])
      } else throw new Error(JSON.stringify(res))
    } catch (error) {
      // console.log('error', JSON.stringify(error), error)
    }
  }

  const refreshData = async () => {
    setRefresh(true)
    getNewsData()
    setRefresh(false)
  }

  if (loading) {
    return <LoadingComponent isLoading={loading} />
  } else {
    return (
      <List
        data={data}
        extraData={data}
        keyExtractor={(item) => item?.id}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ItemTrong
            content={translate("KHONG_CO_TIN_TUC_TRONG_MUC_NAY")}
            customStyle={R.themes.empty}
          />
        }
        style={styles.list}
        refreshing={refreshing}
        onRefresh={refreshData}
        renderItem={({ item }) => <ItemNews item={item} />}
      />
    )
  }
}

export default TabContent
const styles = StyleSheet.create({
  list: {
    backgroundColor: R.colors.whitef2,
    paddingTop: HEIGHT(16),
    width: getWidth(),
  },
})
