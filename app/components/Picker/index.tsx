import React, { useEffect, useState } from "react"
import { StyleSheet, ViewStyle, Text, View } from "react-native"
import { IndexPath, Select, SelectItem } from "@ui-kitten/components"

import R from "../../assets/R"
import { getFont, HEIGHT, WIDTH } from "../../configs/functions"

type Props = {
  data: Array<string>
  customStyle?: ViewStyle
  onChange?: (value: string) => void
  initial?: number
  testID?: string
  title?: string
}

const Picker: React.FC<Props> = (props: Props) => {
  const { data, customStyle, onChange, initial, testID, title } = props
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    const init = initial || 0
    setSelectedValue(data[init])
  }, [initial])

  return (
    <View testID={testID}>
      {title && (
        <View style={[styles.container, styles.viewTxt, customStyle]}>
          <Text style={styles.title}>{title && title}</Text>
        </View>
      )}
      <Select
        style={[styles.container, customStyle]}
        value={() => <Text style={styles.text}>{selectedValue}</Text>}
        size="small"
        status="success"
        onSelect={(index: IndexPath) => {
          setSelectedValue(data[index.row])
          onChange && onChange(data[index.row])
        }}
      >
        {data.map((item: string, index) => (
          <SelectItem title={item} key={index} testID={`${index}_${item}`} />
        ))}
      </Select>
    </View>
  )
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
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    fontWeight: "bold",
    marginLeft: WIDTH(10),
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
    paddingLeft: WIDTH(8),
    width: WIDTH(225),
  },
})
