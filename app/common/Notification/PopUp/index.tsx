import React from "react"
import { View } from "react-native"
import { Modal, Button, Text } from "@ui-kitten/components"
import styles from "./styles"
type Props = {
  visible: boolean
  title: string
  message?: string
  leftText: string
  rightText: string
  leftButton: () => void
  rightButton: () => void
}

/**
 * To show popup like modal. Use as a component (props, state)
 */
export const Popup: React.FC<Props> = (props: Props) => {
  const { visible, title, message, leftButton, leftText, rightButton, rightText } = props
  return (
    <Modal visible={visible} backdropStyle={styles.container} onBackdropPress={leftButton}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.txcontent}>{message}</Text>}
        </View>
        <View style={styles.bottomButton}>
          <Button onPress={leftButton} style={styles.leftButton}>
            {leftText}
          </Button>
          <Button onPress={rightButton} style={styles.rightButton}>
            {rightText}
          </Button>
        </View>
      </View>
    </Modal>
  )
}
