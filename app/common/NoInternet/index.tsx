// @flow
import React, { PureComponent } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native"
import NetInfo from "@react-native-community/netinfo"
import FastImage from "react-native-fast-image"
import { connect } from "react-redux"

import R from "../../assets/R"
import { getHeight, getWidth, HEIGHT, WIDTH } from "../../configs/functions"
import { translate } from "../../i18n"
import { defaultBody } from "@configs/constant"

type Props = any
type State = {
  isConnected: boolean
  loading: boolean
  showPopup: boolean
}
class NoInternet extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isConnected: true,
      showPopup: false,
      loading: false,
    }
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state.isConnected)
    })
  }

  handleConnectivityChange = (isConnected: boolean) => {
    const countDownDate = new Date("2019/09/21 8:30").getTime()
    const now = new Date().getTime()
    const distance = countDownDate - now
    if (!isConnected) {
      if (distance < 0) {
        this.setState({ showPopup: !isConnected })
        if (this.state.isConnected !== isConnected) {
          this.setState({ isConnected })
        }
      }
    }
  }

  closeModal = () => {
    this.setState({ showPopup: false })
  }

  handlePressTryAgaint = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      NetInfo.fetch().then((state) => {
        // console.log("state", state.isConnected)
        this.setState({ isConnected: state.isConnected })
        this.setState({ showPopup: !state.isConnected })
        if (state.isConnected === true) {
          // chua co
        }
      })
      this.setState({ loading: false })
    }, 1500)
  }

  render() {
    const { showPopup, loading } = this.state
    if (showPopup) {
      return (
        <TouchableWithoutFeedback style={styles.container}>
          <View style={styles.opacityTouch}>
            <View style={styles.offlineContainer}>
              <Image
                source={R.images.noInternet}
                style={styles.imageStyle}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.textStyle}>{translate("KHONG_CO_MANG")}</Text>
              <Text style={styles.subTextStyle}>{translate("KIEM_TRA_LAI_KET_NOI")}</Text>
              <TouchableOpacity onPress={this.handlePressTryAgaint} style={styles.buttonOk}>
                {loading ? (
                  <ActivityIndicator size="small" color={R.colors.primary} />
                ) : (
                  <Text style={styles.tryAgaint}>{"Thử lại"}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return <View />
  }
}

const styles = StyleSheet.create({
  buttonOk: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: HEIGHT(30),
    height: HEIGHT(40),
    justifyContent: "center",
    marginTop: HEIGHT(5),
    paddingHorizontal: WIDTH(15),
    width: WIDTH(100),
  },
  container: {
    flex: 1,
  },
  imageStyle: {
    height: HEIGHT(100),
    width: WIDTH(200),
  },
  offlineContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(15),
    justifyContent: "center",
    paddingVertical: HEIGHT(30),
    width: WIDTH(270),
  },

  opacityTouch: {
    alignItems: "center",
    backgroundColor: R.colors.black30p,
    flex: 1,
    fontWeight: "bold",
    height: getHeight(),
    justifyContent: "center",
    position: "absolute",
    width: getWidth(),
  },
  subTextStyle: {
    color: R.colors.black0,
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  textStyle: {
    color: R.colors.black0,
    fontSize: 20,
    marginTop: 10,
  },
  tryAgaint: {
    alignSelf: "center",
    color: R.colors.white,
  },
})

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, {})(NoInternet)
