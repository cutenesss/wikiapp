import React, { useState } from "react"
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import Icon from "react-native-vector-icons/Ionicons"

import R from "@assets/R"
import { getFont, WIDTH, HEIGHT, getLineHeight } from "@configs/functions"
import { INPUT_TYPE } from "@configs/constant"
import { translate } from "@i18n"

type Props = {
  icon?: any
  isPassword?: boolean
  onChangeValue?: (value: string) => void
  placeholder?: string
  defaultValue: string
  required?: boolean
  style?: any
  multiline?: boolean
  editable?: boolean
  maxLength?: number
  isNumber?: boolean
  type: number
  index?: number
  disabled?: boolean
  dateFormat?: boolean
  showDateFormat?: string
  customStyle?: any
  minDate?: Date
  title?: string
  maxDate?: Date
  isAlert?: number
  textAlert?: string
  customRow?: any
  customContainerStyle?: any
  customStyleTitle?: any
  customStyleTxtTitle?: any
}

const TextInputIcon = (props: Props) => {
  const textinput = React.useRef(null)
  const {
    customRow,
    editable,
    icon,
    onChangeValue,
    placeholder,
    defaultValue,
    style,
    multiline,
    maxLength,
    isNumber,
    type,
    disabled,
    dateFormat,
    showDateFormat,
    minDate,
    maxDate,
    customStyle,
    customContainerStyle,
    customStyleTitle,
    customStyleTxtTitle,
  } = props
  const [textInputValue, setTextInputValue] = useState(defaultValue || "")
  const [hideText, setHideText] = useState(props?.isPassword)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [datePickerValue, setDatePickerValue] = useState(defaultValue || new Date().toISOString())

  React.useEffect(() => {
    if (type === INPUT_TYPE.DATE_PICKER) setDatePickerValue(defaultValue)
    else setTextInputValue(defaultValue)
  }, [defaultValue])

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const onChangeValueInput = (value, inputType: number) => {
    let date
    switch (inputType) {
      case INPUT_TYPE.TEXT_INPUT:
        setTextInputValue(value)
        onChangeValue && onChangeValue(value)
        break
      case INPUT_TYPE.DATE_PICKER:
        date = new Date(new Date(moment(value, "DD/MM/YYYY").toISOString())).toISOString()
        value !== "" && onChangeValue && onChangeValue(date)
        setDatePickerValue(date)
        break
      default:
        break
    }
  }

  switch (type) {
    case INPUT_TYPE.TEXT_INPUT: {
      return (
        <View style={[styles.container, customContainerStyle]}>
          <TextInputTitle
            title={props.title}
            customStyleTitle={customStyleTitle}
            customStyleTxtTitle={customStyleTxtTitle}
          />
          <View style={[styles.inputLine, customRow]}>
            {icon && icon}
            <TextInput
              ref={(ref) => (textinput.current = ref)}
              value={textInputValue}
              keyboardType={isNumber ? "numeric" : "default"}
              editable={editable !== undefined ? editable : true}
              style={[styles.textInput, style]}
              onChangeText={(text) => onChangeValueInput(text, INPUT_TYPE.TEXT_INPUT)}
              secureTextEntry={hideText}
              placeholderTextColor={R.colors.gray6}
              maxLength={maxLength || 255}
              placeholder={placeholder}
              autoCapitalize="none"
              multiline={multiline}
              textAlignVertical={multiline ? "top" : "center"}
              defaultValue={defaultValue}
            />
            {props?.isPassword && (
              <TouchableOpacity onPress={() => setHideText(!hideText)} hitSlop={R.themes.hitSlop}>
                <Icon
                  size={WIDTH(20)}
                  name={hideText ? "eye-off-outline" : "eye"}
                  color={R.colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )
    }
    case INPUT_TYPE.DATE_PICKER: {
      return (
        <View style={[styles.container, customStyle]}>
          <TextInputTitle title={props.title} />
          <TouchableOpacity
            disabled={disabled}
            style={[styles.viewDatePicker, customStyle]}
            onPress={showDatePicker}
          >
            <Icon size={WIDTH(20)} name={"calendar"} color={R.colors.primary} />
            <TextInput
              editable={false}
              style={[styles.textInput, style]}
              secureTextEntry={hideText}
              placeholderTextColor={R.colors.gray6}
              placeholder={placeholder}
              autoCapitalize="none"
              value={
                datePickerValue
                  ? moment(datePickerValue).format(showDateFormat || "DD/MM/YYYY")
                  : ""
              }
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={dateFormat ? "datetime" : "date"}
            locale="vi"
            disabled={disabled}
            minimumDate={minDate ? new Date() : undefined}
            maximumDate={maxDate}
            headerTextIOS={translate("CHON_THOI_GIAN")}
            confirmTextIOS={translate("DONG_Y")}
            cancelTextIOS={translate("HUY")}
            onConfirm={(valueDate) => {
              onChangeValueInput(valueDate, INPUT_TYPE.DATE_PICKER)
              hideDatePicker()
            }}
            onCancel={hideDatePicker}
          />
        </View>
      )
    }
    default:
      return null
  }
}

const TextInputTitle = ({
  title,
  customStyleTitle,
  customStyleTxtTitle,
}: {
  title: string
  customStyleTitle?: any
  customStyleTxtTitle?: any
}) => {
  if (title) {
    return (
      <View style={[styles.viewText, customStyleTitle]}>
        <Text style={[styles.text, customStyleTxtTitle]}>{title && title.toUpperCase()}</Text>
      </View>
    )
  } else return <View />
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: R.colors.white,
    marginTop: HEIGHT(12),
    width: WIDTH(343),
  },
  inputLine: {
    alignItems: "center",
    backgroundColor: R.colors.gray0,
    borderRadius: WIDTH(8),
    flexDirection: "row",
    marginBottom: HEIGHT(2),
    marginHorizontal: 1,
    paddingLeft: WIDTH(18),
    paddingVertical: HEIGHT(9),
    width: WIDTH(343),
    ...R.themes.shadowGray,
  },
  text: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(13),
    fontWeight: "700",
    lineHeight: getLineHeight(18),
  },
  textInput: {
    color: R.colors.black0,
    fontSize: getFont(16),
    marginRight: WIDTH(5),
    marginVertical: 0,
    paddingLeft: WIDTH(6),
    paddingVertical: 0,
    width: WIDTH(280),
  },
  viewDatePicker: {
    alignItems: "center",
    backgroundColor: R.colors.gray0,
    borderRadius: WIDTH(8),
    elevation: 1,
    flexDirection: "row",
    marginBottom: HEIGHT(2),
    marginHorizontal: 1,
    paddingLeft: WIDTH(18),
    paddingVertical: HEIGHT(9),
    shadowColor: R.colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    width: WIDTH(343),
  },
  viewText: {
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(4),
    marginLeft: WIDTH(16),
  },
})
export default TextInputIcon
