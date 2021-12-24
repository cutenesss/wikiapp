import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View, TextInput, Platform } from "react-native"

// apis
import { getSubArea } from "@apis/functions/user"

// config
import { WIDTH, getFont, HEIGHT } from "@configs/functions"
import { translate } from "@i18n"
import R from "@assets/R"

import Picker from "@components/Picker"
import { ItemArea } from "@types"

interface Props {
  title?: string
  customWidth?: number
  opacity?: number
  borderColor?: string
  disabled?: boolean
  onChangeValue: (value: any) => void
  defaultValue: any
  showInput?: boolean
  belongTo?: string
}

const ItemPickerArea = (props: Props) => {
  const { title, disabled, onChangeValue, defaultValue, showInput, belongTo } = props

  const [listThanhPho, setListThanhPho] = useState([translate("CHON_TP")])
  const [tenTP, setTenTP] = useState(0)
  //   const [tenTP, setTenTP] = useState(translate("CHON_TP"))
  const [listQuanHuyen, setListQuanHuyen] = useState([translate("CHON_QUAN_HUYEN")])
  const [tenQH, setTenQH] = useState(0)
  //   const [tenQH, setTenQH] = useState(translate("CHON_QUAN_HUYEN"))
  const [listPhuongXa, setListPhuongXa] = useState([translate("CHON_PHUONG_XA")])
  const [tenPX, setTenPX] = useState(0)
  //   const [tenPX, setTenPX] = useState(translate("CHON_PHUONG_XA"))
  const [diaChi, setDiaChi] = useState(defaultValue?.soNhaTenDuong ?? "")
  const [listPickerData, setListPickerData] = useState([])

  const donViHanhChinh = useRef({
    province_id: "",
    tenTinh: "",
    district_id: "",
    tenQuanHuyen: "",
    village_id: "",
    tenPhuongXa: "",
  })

  useEffect(() => {
    getTinhThanhPho()
  }, [])

  const getTinhThanhPho = async () => {
    try {
      let [listTP, listQH, listPX, pickerData] = [[], [], [], []]
      const responseTP = await getSubArea("0")
      listTP = responseTP?.subarea_list?.map((itemTP) => itemTP?.area_name)
      console.log("1", listTP)
      listTP.unshift(translate("CHON_TP"))
      console.log("2", listTP)
      pickerData.push(responseTP?.subarea_list ?? [])
      const itemTP = findDonViByID(responseTP?.subarea_list, defaultValue?.province_id)

      const responseQuanHuyen = await getSubArea(defaultValue?.province_id?.toString())
      pickerData.push(responseQuanHuyen?.subarea_list ?? [])
      listQH = responseQuanHuyen?.subarea_list?.map((itemQH) => itemQH?.area_name) ?? []
      console.log("3", listQH)
      listQH?.unshift(translate("CHON_QUAN_HUYEN"))
      console.log("4", listQH)
      const itemQH = findDonViByID(responseQuanHuyen?.subarea_list ?? [], defaultValue?.district_id)

      const responsePhuongXa = await getSubArea(defaultValue?.district_id?.toString())
      pickerData.push(responsePhuongXa?.subarea_list)
      listPX = responsePhuongXa?.subarea_list?.map((itemPX) => itemPX?.area_name) ?? []
      console.log("5", listPX)
      listPX?.unshift(translate("CHON_PHUONG_XA"))
      console.log("6", listPX)
      const itemPX = findDonViByID(responsePhuongXa?.subarea_list ?? [], defaultValue?.village_id)

      setTenTP(itemTP < 0 ? 0 : itemTP)
      setTenQH(itemQH < 0 ? 0 : itemQH)
      setTenPX(itemPX < 0 ? 0 : itemPX)
      setListThanhPho(listTP)
      setListQuanHuyen(listQH)
      setListPhuongXa(listPX)
      setListPickerData(pickerData)
      setDiaChi(defaultValue?.soNhaTenDuong ?? "")
    } catch (error) {
      console.log("e", error)
    }
  }

  const findDonViByID = (listDonVi: Array<ItemArea>, ma: number) => {
    const itemDV = listDonVi.findIndex((donVi) => donVi?.area_id === ma)
    return itemDV
  }

  const findDonViByName = (listDonVi: Array<ItemArea>, name: string) => {
    const itemDV = listDonVi.find((donVi) => donVi?.area_name === `${name}`)
    return itemDV
  }

  const findIndexDonViByName = (listDonVi: Array<string>, name: string) => {
    const itemDV = listDonVi.findIndex((donVi) => donVi === `${name}`)
    return itemDV
  }

  const onChangeTP = async (value: string) => {
    console.log("onChangeTPValue", value)
    let [listQH, pickerData] = [[...listQuanHuyen], [...listPickerData]]
    if (value !== translate("CHON_TP")) {
      try {
        const itemTP = findDonViByName(pickerData[0], value)
        console.log("22222", itemTP)
        const responseQuanHuyen = await getSubArea(itemTP?.area_id?.toString())
        pickerData.splice(1, 1, responseQuanHuyen.subarea_list)
        pickerData.splice(2, 1, [])
        listQH = responseQuanHuyen.subarea_list.map((itemQH) => itemQH?.area_name)
        listQH.unshift(translate("CHON_QUAN_HUYEN"))
        const newDVHC = {
          province_id: itemTP.area_id?.toString(),
          tenTinh: itemTP.area_name,
          district_id: "",
          tenQuanHuyen: "",
          village_id: "",
          tenPhuongXa: "",
        }
        donViHanhChinh.current = newDVHC
        onChangeValue(donViHanhChinh.current)
      } catch (error) {}
    } else {
      listPickerData.splice(1, 1, [translate("CHON_QUAN_HUYEN")])
      listPickerData.splice(2, 1, [translate("CHON_PHUONG_XA")])
      const newDVHC = {
        province_id: "",
        tenTinh: "",
        district_id: "",
        tenQuanHuyen: "",
        village_id: "",
        tenPhuongXa: "",
      }
      donViHanhChinh.current = newDVHC
      onChangeValue(donViHanhChinh.current)
    }
    const itemValueIndex = findIndexDonViByName(listThanhPho, value)
    setTenQH(0)
    setTenTP(itemValueIndex)
    setListPickerData(pickerData)
    setListQuanHuyen(listQH)

    setTenPX(0)
    setListPhuongXa([translate("CHON_PHUONG_XA")])
  }

  const onChangeQH = async (value: string) => {
    let [listPX, pickerData] = [[...listPhuongXa], [...listPickerData]]
    if (value !== translate("CHON_QUAN_HUYEN")) {
      try {
        const itemQH = findDonViByName(listPickerData[1], value)
        const responsePX = await getSubArea(itemQH?.area_id?.toString())
        pickerData.splice(2, 1, responsePX.subarea_list)
        listPX = responsePX.subarea_list.map((item) => item?.area_name)
        listPX.unshift(translate("CHON_PHUONG_XA"))
        const newDVHC = {
          ...donViHanhChinh.current,
          district_id: itemQH.area_id?.toString(),
          tenQuanHuyen: itemQH.area_name,
          village_id: "",
          tenPhuongXa: "",
        }
        donViHanhChinh.current = newDVHC
        onChangeValue(donViHanhChinh.current)
      } catch (error) {}
    } else {
      listPickerData.splice(2, 1, [])
      const newDVHC = {
        ...donViHanhChinh.current,
        district_id: "",
        tenQuanHuyen: "",
        village_id: "",
        tenPhuongXa: "",
      }
      donViHanhChinh.current = newDVHC
      onChangeValue(donViHanhChinh.current)
    }
    const itemValueIndex = findIndexDonViByName(listQuanHuyen, value)
    setTenQH(itemValueIndex)
    setTenPX(0)
    setListPickerData(pickerData)
    setListPhuongXa(listPX)
  }

  const onChangePX = (value: string) => {
    if (value !== translate("CHON_PHUONG_XA")) {
      const itemPX = findDonViByName(listPickerData[2], value)
      const itemValueIndex = findIndexDonViByName(listPhuongXa, value)
      setTenPX(itemValueIndex)
      const newDVHC = {
        ...donViHanhChinh.current,
        village_id: itemPX.area_id?.toString(),
        tenPhuongXa: itemPX.area_name,
      }
      donViHanhChinh.current = newDVHC
      onChangeValue(donViHanhChinh.current)
    } else {
      const newDVHC = {
        ...donViHanhChinh.current,
        village_id: "",
        tenPhuongXa: "",
      }
      donViHanhChinh.current = newDVHC
      onChangeValue(donViHanhChinh.current)
    }
  }

  return (
    <View style={styles.container}>
      <Picker
        initial={tenTP}
        data={listThanhPho}
        customStyle={styles.customStyle}
        onChange={onChangeTP}
        customStyleView={styles.customStyle}
      />
      <Picker
        initial={tenQH}
        data={listQuanHuyen}
        customStyle={styles.customStyle}
        onChange={onChangeQH}
        customStyleView={styles.customStyle}
        disabled={tenTP === 0}
      />
      <Picker
        initial={tenPX}
        data={listPhuongXa}
        customStyle={styles.customStyle}
        onChange={onChangePX}
        customStyleView={styles.customStyle}
        disabled={tenQH === 0 || tenTP === 0}
      />
      <InputArea
        showInput={showInput}
        diaChi={diaChi}
        disabled={disabled}
        belongTo={belongTo}
        title={title}
        onValueChange={(text) => {
          setDiaChi(text)
          const newDVHC = {
            ...donViHanhChinh.current,
            soNhaTenDuong: text,
          }
          donViHanhChinh.current = newDVHC
          onChangeValue(donViHanhChinh.current)
        }}
      />
    </View>
  )
}

const InputArea = ({ title, showInput, diaChi, disabled, onValueChange, belongTo }) => {
  if (showInput) {
    const opacity = disabled ? (Platform.OS === "ios" ? 0.8 : 0.5) : 1
    const borderColor = disabled ? R.colors.grey400 : R.colors.black3
    return (
      <TextInput
        // testID={title}
        testID={`${title}${belongTo || ""}`}
        onChangeText={(text) => onValueChange(text)}
        editable={!disabled}
        style={[styles.input, { borderColor, opacity }]}
        placeholder={translate("DIA_CHI")}
        value={diaChi}
        defaultValue={diaChi}
        maxLength={2000}
        contextMenuHidden
      />
    )
  } else return <View />
}

export default ItemPickerArea

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  customStyle: {
    backgroundColor: R.colors.transparent,
    marginBottom: HEIGHT(4),
    width: WIDTH(343),
  },
  input: {
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderColor: R.colors.grey400,
    borderRadius: WIDTH(8),
    borderWidth: WIDTH(1),
    color: R.colors.black0,
    fontSize: getFont(16),
    minHeight: 45,
    paddingBottom: 0,
    paddingHorizontal: WIDTH(16),
    paddingTop: 0,
    width: WIDTH(332),
  },
})
