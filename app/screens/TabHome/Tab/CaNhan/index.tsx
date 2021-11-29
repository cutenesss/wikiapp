import React from "react"
import { View, ScrollView } from "react-native"
import { useSelector } from "@redux/reducers"
import { shallowEqual } from "react-redux"

import styles from "./styles"

// common
import FlatlistItem from "../Item/FlatlistItem"
import ItemViewPersonalInfo from "./Item/ItemViewPersonalInfo"
import { ESystemRoles } from "@types"

const DS_CHUC_NANG = [
  {
    text: "",
    title: "Cập nhật thông tin cá nhân",
  },
  {
    text: "",
    title: "Đăng xuất",
  },
]

const CaNhan = () => {
  const { userInfo } = useSelector((state) => state.userReducers, shallowEqual)
  const data = DS_CHUC_NANG

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ItemViewPersonalInfo item={userInfo} />
        <FlatlistItem data={data} account={userInfo} />
      </ScrollView>
    </View>
  )
}
export default CaNhan
