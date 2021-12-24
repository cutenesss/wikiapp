import React, { useEffect, useState } from "react"
import { StyleSheet, ViewStyle, View } from "react-native"
import { IndexPath, Text, Select, SelectItem } from "@ui-kitten/components"

import R from "../../assets/R"
import { getFont, HEIGHT, WIDTH } from "../../configs/functions"

type Props = {
  data: Array<string>
  customStyle?: ViewStyle
  onChange?: (value: string) => void
  initial?: any
  testID?: string
  title?: string
  status?: string
  disabled?: boolean
  customStyleView?: any
  isInvisible?: boolean
}

const Picker: React.FC<Props> = (props: Props) => {
  const {
    data,
    customStyle,
    onChange,
    initial,
    customStyleView,
    title,
    status,
    disabled,
    isInvisible,
  } = props
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    const init = initial || 0
    setSelectedValue(data[init])
  }, [initial, data])

  if (isInvisible) {
    return <View />
  } else {
    return (
      <View style={customStyleView}>
        {title && (
          <View style={[styles.container, styles.viewTxt]}>
            <Text style={styles.title}>{title && title}</Text>
          </View>
        )}
        <Select
          disabled={disabled}
          style={[styles.container, customStyle]}
          value={() => (
            <Text category={"p1"} style={styles.text}>
              {selectedValue}
            </Text>
          )}
          size="medium"
          status={status || "success"}
          onSelect={(index: IndexPath) => {
            setSelectedValue(data[index.row])
            onChange && onChange(data[index.row])
          }}
        >
          {data.map((item: string, index) => (
            <SelectItem
              key={index}
              testID={`${index}_${item}`}
              title={() => <Text category="h4">{item}</Text>}
            />
          ))}
        </Select>
      </View>
    )
  }
}

export default Picker
const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.grey400,
    width: WIDTH(225),
  },
  text: {
    color: R.colors.black0,
    fontWeight: "bold",
    marginLeft: WIDTH(8),
  },
  title: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    fontWeight: "bold",
  },
  viewTxt: {
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(8),
    marginLeft: WIDTH(32),
    width: WIDTH(250),
  },
})
