import React from "react"
import { View, StyleSheet, Linking } from "react-native"
import Pdf from "react-native-pdf"
import * as Sentry from "@sentry/react-native"

// import config
import { getWidth, popupOk } from "../../configs/functions"
import { translate } from "@i18n"

// import common
import HeaderBack from "../../components/Headers/HeaderBack"

type Props = {
  route: {
    params: {
      sourcePDF: string
    }
  }
}

const ViewPDF: React.FC<Props> = (props: Props) => {
  const sourcePDF = props.route.params?.sourcePDF

  return (
    <View style={styles.container}>
      <HeaderBack title={translate("CHI_TIET")} />
      <View style={styles.cntPDF}>
        <Pdf source={{ uri: `bundle-assets://${sourcePDF}` }} style={styles.pdf} />
      </View>
    </View>
  )
}

export default ViewPDF
const styles = StyleSheet.create({
  cntPDF: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: getWidth(),
  },
})
