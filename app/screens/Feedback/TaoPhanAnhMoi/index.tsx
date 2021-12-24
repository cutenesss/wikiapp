import React from "react"
import { View, TextInput } from "react-native"
import { Text } from "@ui-kitten/components"

import styles from "./styles"
import ViewPickImage from "./Item/ViewPickImage"
import TextInputIcon from "@components/Input/TextInputIcon"
import { translate } from "@i18n"
import { INPUT_TYPE } from "@configs/constant"

const TaoPhanAnhMoi = () => {
  const content = React.useRef({
    image: undefined,
    nd: "",
    loai: "",
  })
  const onChangeValue = (value: any, index: number) => {
    switch (index) {
      case -1:
        content.current.image = value
        break
      case 2:
        content.current.nd = value?.trim()
        break

      default:
        break
    }
  }

  return (
    <View style={styles.container}>
      <ViewPickImage onImageChange={(value) => onChangeValue(value, -1)} />
      <TextInputIcon
        defaultValue={content.current.nd}
        placeholder={translate("NOI_DUNG_PHAN_ANH")}
        style={styles.textInput}
        onChangeValue={(value: string) => onChangeValue(value, 2)}
        type={INPUT_TYPE.TEXT_INPUT}
        title={translate("NOI_DUNG_PHAN_ANH")}
      />
    </View>
  )
}

export default TaoPhanAnhMoi
