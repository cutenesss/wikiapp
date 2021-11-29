import React from "react"
import { StyleSheet, View } from "react-native"
import { List } from "@ui-kitten/components"
import { useSelector } from "@redux/reducers"
import { shallowEqual, useDispatch } from "react-redux"

import STATUS from "@apis/status"
import { logout } from "@apis/functions/user"
import { getUserProfile } from "@redux/actions/userAction"
import { handleErrorApiWithStatusCode } from "@apis/handleError"

// config
import R from "@assets/R"
import { HEIGHT, popupAlert, popupOk, WIDTH } from "@configs/functions"
import { translate } from "@i18n"
import ScreenName from "@navigation/screen-name"
import { navigate, reset } from "@navigation/navigation-service"
import { ESystemRoles } from "@types"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"

// common
// import ItemListTabHome from "./ItemListTabHome"
import BaseButton from "@components/Buttons/BaseButton"
import LoadingComponent from "@common/Loading/LoadingComponent"

type Props = {
  data: Array<any>
  account: any
}

const FlatlistItem = (props: Props) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userReducers, shallowEqual)
  const { data } = props
  const [loading, setLoading] = React.useState(false)

  const goToDetailScreen = (title: string) => {
    switch (title) {
      case translate("DOI_VAI_TRO"):
        // reset(ScreenName.ChonVaiTro)
        break
      default:
        break
    }
  }


  return (
    <View>
      <List
        data={data}
        keyExtractor={(item) => item.title}
        scrollEnabled={false}
        contentContainerStyle={styles.center}
        style={styles.listFunction}
        renderItem={({ item }) => (
          <BaseButton
            title={item?.title}
            onPress={() => goToDetailScreen(item?.title)}
            customStyleBtn={styles.align}
          />
        )}
      />
      <LoadingComponent isLoading={loading} />
    </View>
  )
}
export default FlatlistItem
const styles = StyleSheet.create({
  align: {
    alignSelf: "center",
    marginBottom: HEIGHT(8),
  },
  center: {
    alignItems: "center",
  },
  listFunction: {
    alignSelf: "center",
    backgroundColor: R.colors.transparent,
    borderRadius: WIDTH(8),
    flexGrow: 0,
    marginBottom: HEIGHT(20),
    width: WIDTH(343),
  },
})
