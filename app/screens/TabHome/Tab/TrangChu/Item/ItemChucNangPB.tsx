import React from "react"
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { useSelector } from "@redux/reducers"
import { shallowEqual } from "react-redux"

// config
import R from "@assets/R"
import { WIDTH, getLineHeight, getFont, HEIGHT } from "@configs/functions"

// common
import IconSVG from "@components/Icons/IconSVG"

import { translate } from "@i18n"

import { navigate } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"
import { ESystemRoles } from "@types"

const ItemChucNangPB = (props) => {
  const { userInfo } = useSelector((state) => state.userReducers, shallowEqual)
  const { classInfo } = useSelector((state) => state.currentClassReducers, shallowEqual)

  const goToDetail = (title: string) => {
    const { goToTabTienIch } = props
    switch (title) {
      case translate("DIEM_DANH"):
        if (userInfo?.role?.systemRole === ESystemRoles.PhuHuynh) {
          navigate(ScreenName.DiemDanhPhuHuynh, { classInfo })
        } else {
          navigate(ScreenName.QuanLyDiemDanh, { classInfo })
        }
        break
      case translate("DIEM_DANH_MUON"):
        navigate(ScreenName.QuanLyDiemDanh, { classInfo, isLate: true })
        break
      case translate("XIN_NGHI_HOC"):
        navigate(ScreenName.PhuHuynhXinNghiHoc, { classInfo })
        break
      case translate("notice_t"):
        navigate(ScreenName.ThongBao, { classInfo })
        break
      case translate("THOI_KHOA_BIEU"):
        navigate(ScreenName.ThoiKhoaBieu, { classInfo })
        break
      case translate("CHAM_CONG"):
        navigate(ScreenName.ChamCong, { classInfo })
        break
      case translate("BANG_LUONG"):
        navigate(ScreenName.TinhLuong, { classInfo })
        break
      case translate("KHAO_SAT"):
        navigate(ScreenName.KhaoSat, { classInfo })
        break
      case translate("TIN_TUC"):
        navigate(ScreenName.TinTuc)
        break
      case translate("DAN_DON_CON"):
        navigate(ScreenName.DanDonCon)
        break
      case translate("QUAN_LY_DON"):
        navigate(ScreenName.QuanLyDonChoice)
        break
      case translate("DAN_THUOC"):
        navigate(ScreenName.DanThuoc)
        break
      case translate("LOI_NHAN"):
        navigate(ScreenName.LoiNhan)
        break
      case translate("NGOAI_KHOA"):
        if (userInfo?.role?.systemRole === ESystemRoles.PhuHuynh) {
          navigate(ScreenName.NgoaiKhoaPH)
        } else {
          navigate(ScreenName.NgoaiKhoaGV)
        }
        break
      case translate("DANH_GIA_DINH_KY"):
        if (userInfo?.role?.systemRole === ESystemRoles.PhuHuynh) {
          navigate(ScreenName.DanhGiaDinhKyPH)
        } else {
          navigate(ScreenName.DanhGiaDinhKyGV)
        }
        break
      case translate("DANH_SACH_LOP"):
        navigate(ScreenName.DSHocSinh)
        break
      case translate("SUC_KHOE"):
        navigate(ScreenName.DanhGiaSKPH, { conId: userInfo?.role?.childId })
        break
      case translate("DANH_GIA_CO"):
        navigate(ScreenName.DanhGiaCo)
        break
      case translate("TIN_NHAN"):
        navigate(ScreenName.TinNhan)
        break
      case translate("TIEN_ICH_KHAC"):
        goToTabTienIch && goToTabTienIch()
        break
      case translate("HOC_PHI"):
        navigate(ScreenName.HocPhi)
        break
      case translate("THUC_DON"):
        navigate(ScreenName.ThucDon)
        break
      default:
        break
    }
  }

  const { title, color, backgroundColor, onPress } = props
  const background = backgroundColor || R.colors.white

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        if (onPress) {
          onPress && onPress()
        } else goToDetail(title)
      }}
    >
      <View style={[styles.viewIcon, { backgroundColor: background }]}>
        <IconSVG iconName={title ?? ""} color={color} width={WIDTH(18)} height={WIDTH(18)} />
      </View>
      <View style={styles.viewText}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemChucNangPB

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: R.colors.gray0,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(12),
    marginHorizontal: WIDTH(6),
    minHeight: HEIGHT(100),
    padding: WIDTH(12),
    width: WIDTH(105),
    ...R.themes.shadow,
  },
  text: {
    color: R.colors.black0,
    flexWrap: "wrap",
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(15),
    lineHeight: getLineHeight(20),
    textAlign: "center",
  },
  viewIcon: {
    alignItems: "center",
    borderRadius: WIDTH(35) / 2,
    height: WIDTH(35),
    justifyContent: "center",
    width: WIDTH(35),
  },
  viewText: {
    flex: 1,
    marginTop: HEIGHT(5),
  },
})
