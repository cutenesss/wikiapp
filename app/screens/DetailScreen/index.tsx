import { SafeAreaView, StyleSheet } from "react-native"
import { WebView } from "react-native-webview"
import React from 'react'
import LoadingComponent from "@common/Loading/LoadingComponent"

interface Props {
  route: {
    params: {
      pageid: string
    }
  }
}

const DetailScreen = (props: Props) => {
  const pageid = props?.route?.params?.pageid
  const [loading, setLoading] = React.useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: `https://en.wikipedia.org/?curid=${pageid}` }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <LoadingComponent isLoading={loading} />
    </SafeAreaView>
  )
}

export default DetailScreen
const styles = StyleSheet.create({
  container: { flex: 1 }
})
