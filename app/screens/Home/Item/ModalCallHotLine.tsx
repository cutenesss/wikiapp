import React from "react"
import { StyleSheet, View, Linking, TouchableOpacity, Image } from "react-native"
import { List, Layout, Text } from "@ui-kitten/components"
import Modal from "react-native-modal"

import R from "@assets/R"
import { HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"

interface Props {
  isVisible: boolean
  onChangeModalVisible: (value: boolean) => void
}

const DATA_LIST = [
  {
    title: "Ủy ban nhân dân",
    phone: "0433517085",
  },
  {
    title: "Công an",
    phone: "09144788939",
  },
]

const ModalCallHotLine = (props: Props) => {
  const { isVisible, onChangeModalVisible } = props

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={() => onChangeModalVisible && onChangeModalVisible(false)}
      onBackdropPress={() => onChangeModalVisible && onChangeModalVisible(false)}
    >
      <Layout style={styles.container}>
        <Text category="h2" style={styles.header}>
          {translate("SDT_HOTLINE")}
        </Text>
        <List
          data={DATA_LIST}
          keyExtractor={(item) => item?.title}
          scrollEnabled={false}
          bounces={false}
          renderItem={({ item }) => <ViewCall item={item} />}
        />
      </Layout>
    </Modal>
  )
}

const ViewCall = ({ item }) => {
  const onPressPhone = () => {
    Linking.openURL(`tel:${item.phone}`)
  }
  return (
    <TouchableOpacity style={styles.item} onPress={onPressPhone}>
      <Image source={R.images.iconPhone} resizeMode="contain" style={styles.img} />
      <View>
        <Text category={"h4"} style={styles.txtTitle}>
          {item?.title}
        </Text>
        <Text category={"p2"} style={styles.phone}>{`${translate("SDT")}: ${item?.phone}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ModalCallHotLine

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.gray0,
    borderRadius: WIDTH(8),
    paddingVertical: HEIGHT(20),
  },
  header: {
    alignSelf: "center",
    color: R.colors.blue0084,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  img: {
    height: WIDTH(60),
    marginHorizontal: WIDTH(16),
    marginLeft: WIDTH(16),
    width: WIDTH(60),
    ...R.themes.shadow,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: HEIGHT(12),
    width: "100%",
  },
  phone: {
    color: R.colors.black0,
  },
  txtTitle: {
    color: R.colors.black0,
  },
})
