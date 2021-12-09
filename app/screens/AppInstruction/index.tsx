import React from "react"
import { View, StyleSheet } from "react-native"
import PagerView from "react-native-pager-view"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Foundation from "react-native-vector-icons/Foundation"
import AntDesign from "react-native-vector-icons/AntDesign"

import { translate } from "@i18n"
import R from "@assets/R"

import PageContent from "./Item/PageContent"
import PageIndicator from "./Item/PageIndicator"
import { WIDTH } from "@configs/functions"
import { navigate } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"

const DATA_PAGE = [
  {
    title: translate("THANH_PHO_THONG_MINH"),
    content: translate("CONTENT_THANH_PHO_THONG_MINH"),
    icon: <FontAwesome5 size={WIDTH(75)} name="hamburger" color={R.colors.white} />,
    color: R.colors.red7,
  },
  {
    title: translate("CU_DAN_THONG_THAI"),
    content: translate("CONTENT_CU_DAN_THONG_THAI"),
    icon: <AntDesign size={WIDTH(75)} name="message1" color={R.colors.white} />,
    color: R.colors.blue1B,
  },
  {
    title: translate("TIEN_ICH_XUNG_QUANH"),
    content: translate("CONTENT_TIEN_ICH_XUNG_QUANH"),
    icon: <Foundation size={WIDTH(75)} name="burst-sale" color={R.colors.white} />,
    color: R.colors.purple900,
  },
  {
    title: translate("SU_KIEN_QUANH_TOI"),
    content: translate("CONTENT_SU_KIEN_QUANH_TOI"),
    icon: <FontAwesome size={WIDTH(75)} name="plane" color={R.colors.white} />,
    color: R.colors.blue0084,
  },
]

const AppInstruction = () => {
  const [currentPage, setCurrentPage] = React.useState(0)

  const viewPager = React.useRef(null)

  const onChangePage = (value: boolean) => {
    const change = value ? 1 : -1
    if (currentPage === DATA_PAGE.length) {
      navigate(ScreenName.Home)
    } else {
      setCurrentPage((page) => page + change)
      viewPager.current.setPage(currentPage + change)
    }
  }

  return (
    <View style={styles.container}>
      <PagerView
        ref={(ref) => {
          viewPager.current = ref
        }}
        style={styles.container}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {DATA_PAGE.map((item, index) => (
          <PageContent item={item} key={index} />
        ))}
      </PagerView>
      <PageIndicator data={DATA_PAGE} currentPage={currentPage} onChangePage={onChangePage} />
    </View>
  )
}

export default AppInstruction

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
