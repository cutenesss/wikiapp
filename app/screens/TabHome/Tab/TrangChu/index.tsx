import React, { useState, useEffect } from "react"
import { FlatList, ScrollView, Animated, View } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"
import { useDispatch, shallowEqual } from "react-redux"
import { useSelector } from "@redux/reducers"

// api
import { ESystemRoles, IResponseLogin } from "@types"

// item
import HeaderHome from "./Item/HeaderHome"
import InforLabel from "./Item/InforLabel"
import LoadingComponent from "@common/Loading/LoadingComponent"
import ItemChucNangPB from "./Item/ItemChucNangPB"
import AutoCompleteSearch, { ETypeData } from "@components/PickerSearch"

// config
import { translate } from "@i18n"
import R from "@assets/R"
import styles from "./styles"
import {
  LIST_DEFAULT_FUNCTION,
  DEFAULT_MOST_USED_FUNCTION_GV,
  DEFAULT_MOST_USED_FUNCTION_PH,
  FUNCTION_ONLY_FOR_PH,
  FUNCTION_ONLY_FOR_GV,
  LOAI_DON_VI,
} from "@configs/constant"
import ScreenName from "@navigation/screen-name"
import { navigate } from "@navigation/navigation-service"
import { HEIGHT, getWidth, WIDTH } from "@configs/functions"
import ItemLabelValue from "@components/Item/ItemLabelValue"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"
import ItemAlbum from "@screens/AlbumAnh/Item/ItemAlbum"
import { regexMatchFilter } from "@configs/functionSearchCondition"
import { getDSDonVi } from "@apis/functions/student"
import STATUS from "@apis/status"

type Props = {
  item: IResponseLogin
  goToTabTienIch?: () => void
}

const TrangChu: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()

  const item = props?.item
  const goToTabTienIch = props?.goToTabTienIch

  const [listDefault, setListDefault] = useState([])
  const [loading, setLoading] = useState(true)
  const [school, setSchool] = useState("")
  const [listSchool, setListSchool] = useState([])
  const [dsTruong, setDsTruong] = useState([])

  const scrollY = new Animated.Value(0)
  const arrayListSchool = React.useRef([])

  React.useEffect(() => {
    getSchool()
  }, [school])

  const getSchool = async () => {
    try {
      const body = {
        page: 1,
        limit: 30,
        cond: {
          loaiDonVi: LOAI_DON_VI.TRUONG,
          ...regexMatchFilter("tenDonVi", school),
        },
      }
      const res = await getDSDonVi(body)
      if (res?.statusCode === STATUS.SUCCESS) {
        const arraySchool = res?.data?.result?.map((item) => item?.tenDonVi)
        arrayListSchool.current = [...res?.data?.result]
        setDsTruong([`${arrayListSchool.current?.[0]?.tenDonVi}`])
        setListSchool([...arraySchool] ?? [])
      } else {
        setListSchool([])
      }
    } catch (error) {}
  }

  useEffect(() => {
    setListDefaultFunction()
  }, [item])

  const setListDefaultFunction = async () => {
    setLoading(true)
    let listDefaultFunction: any = await AsyncStorageUtils.getObject(
      AsyncStorageUtils.KEY.LIST_DEFAULT_FUNCTION,
    )
    if (listDefaultFunction) {
      const result = []
      switch (item?.role?.systemRole) {
        case ESystemRoles.PhuHuynh:
          listDefaultFunction?.map((item: string) => {
            if (!FUNCTION_ONLY_FOR_PH.includes(item)) {
              result.push(item)
            }
            return null
          })
          break
        case ESystemRoles.GiaoVien:
          listDefaultFunction.map((item: string) => {
            if (!FUNCTION_ONLY_FOR_GV.includes(item)) {
              result.push(item)
            }
            return null
          })
          break
        default:
          break
      }
      listDefaultFunction = result
    }
    const initialList = getListChucNang()
    const finalList = listDefaultFunction || initialList
    finalList.push(translate("TIEN_ICH_KHAC"))
    const arrayDefault = finalList.filter(
      (item: string, index: number) => finalList.lastIndexOf(item) === index,
    )
    setListDefault(arrayDefault)
    setLoading(false)
  }

  const getListChucNang = () => {
    switch (item?.role?.systemRole) {
      case ESystemRoles.PhuHuynh:
        return DEFAULT_MOST_USED_FUNCTION_PH
      case ESystemRoles.GiaoVien:
        return DEFAULT_MOST_USED_FUNCTION_GV
      default:
        return []
    }
  }

  const returnBackgroundColor = (index: number) => {
    switch (index) {
      case LIST_DEFAULT_FUNCTION.FUNCTION_1:
        return R.colors.white
      case LIST_DEFAULT_FUNCTION.FUNCTION_2:
        return R.colors.blue5c54a4
      case LIST_DEFAULT_FUNCTION.FUNCTION_3:
        return R.colors.whiteee
      case LIST_DEFAULT_FUNCTION.FUNCTION_4:
        return R.colors.redab
      case LIST_DEFAULT_FUNCTION.FUNCTION_5:
        return R.colors.green50
      case LIST_DEFAULT_FUNCTION.FUNCTION_6:
        return R.colors.blueGrey50
      default:
        return R.colors.green50
    }
  }

  const goToAlbum = () => {
    navigate(ScreenName.AlbumAnh)
  }

  const returnColor = (index: number) => {
    switch (index) {
      case LIST_DEFAULT_FUNCTION.FUNCTION_1:
        return R.colors.green200
      case LIST_DEFAULT_FUNCTION.FUNCTION_2:
        return R.colors.white
      case LIST_DEFAULT_FUNCTION.FUNCTION_3:
        return R.colors.color9B51E0
      case LIST_DEFAULT_FUNCTION.FUNCTION_4:
        return R.colors.white
      case LIST_DEFAULT_FUNCTION.FUNCTION_5:
        return R.colors.greenA700
      case LIST_DEFAULT_FUNCTION.FUNCTION_6:
        return R.colors.blueGrey500
      default:
        return R.colors.brown533111
    }
  }

  const widthChange = scrollY.interpolate({
    inputRange: [0, 65, 65],
    outputRange: [WIDTH(343), getWidth(), getWidth()],
  })
  const borderRadiusChange = scrollY.interpolate({
    inputRange: [0, 65, 65],
    outputRange: [WIDTH(8), 0, 0],
  })
  const paddingTop = scrollY.interpolate({
    inputRange: [0, 60, 65],
    outputRange: [HEIGHT(16), getStatusBarHeight(), getStatusBarHeight()],
  })

  if (loading) {
    return <LoadingComponent isLoading={loading} />
  } else {
    return (
      <>
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          scrollEventThrottle={0}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
        >
          <HeaderHome />
          <InforLabel
            width={widthChange}
            borderRadius={borderRadiusChange}
            paddingTop={paddingTop}
          />
          <AutoCompleteSearch
            disabled={false}
            onSelectItem={(item) => {
              const newdsTruong = [item]
              const findIndex = arrayListSchool.current.findIndex(
                (item) => item?.tenDonVi === newdsTruong?.[0],
              )
              setDsTruong(newdsTruong)
            }}
            data={listSchool}
            placeholder={translate("CHON_TRUONG")}
            required={false}
            typeData={ETypeData.TRUONG}
            dataSelected={dsTruong}
            onChangeSearchValue={(text: string) => setSchool(text)}
          />
          <ViewSlideAlbum goToAlbum={goToAlbum} />
          <View style={styles.styleLastItem}>
            <ItemLabelValue
              label={translate("CHUC_NANG")}
              value={""}
              onPress={goToAlbum}
              color={R.colors.white}
            />
          </View>
          <ChucNangPB
            data={listDefault}
            returnColor={returnColor}
            returnBackgroundColor={returnBackgroundColor}
            goToTabTienIch={goToTabTienIch}
          />
        </ScrollView>
      </>
    )
  }
}

const ViewSlideAlbum = ({ goToAlbum }) => {
  const { refreshing, listImage } = useSelector((state) => state.albumReducers, shallowEqual)
  const { userInfo } = useSelector((state) => state.userReducers, shallowEqual)
  if (
    userInfo?.role?.systemRole === ESystemRoles.PhuHuynh ||
    userInfo?.role?.systemRole === ESystemRoles.GiaoVien
  ) {
    if (refreshing) {
      return (
        <View style={styles.styleLastItem}>
          <ItemLabelValue
            label={translate("ALBUM_ANH")}
            value={translate("XEM_THEM")}
            onPress={goToAlbum}
            color={R.colors.white}
          />
          <LoadingComponent isLoading={refreshing} />
        </View>
      )
    } else {
      return (
        <View style={styles.styleLastItem}>
          <ItemLabelValue
            label={translate("ALBUM_ANH")}
            value={translate("XEM_THEM")}
            onPress={goToAlbum}
            color={R.colors.white}
          />
          <FlatList
            data={listImage}
            extraData={listImage}
            horizontal={true}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <ItemAlbum item={item} hideLine={true} />
                <View style={styles.width} />
              </View>
            )}
          />
        </View>
      )
    }
  } else return <View />
}

const ChucNangPB = ({ data, returnColor, returnBackgroundColor, goToTabTienIch }) => (
  <FlatList
    data={data}
    extraData={data}
    scrollEnabled={false}
    style={styles.listDefault}
    numColumns={3}
    keyExtractor={(item, index) => `${index}`}
    columnWrapperStyle={styles.columnWrapperStyle}
    renderItem={({ item, index }) => (
      <ItemChucNangPB
        title={item}
        color={returnColor(index)}
        backgroundColor={returnBackgroundColor(index)}
        goToTabTienIch={goToTabTienIch}
      />
    )}
  />
)
export default TrangChu
