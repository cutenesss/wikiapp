/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View, StyleSheet } from "react-native"
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder"

import R from "@assets/R"
import { HEIGHT, WIDTH } from "@configs/functions"

const LoadingIpa: React.FC = () => {
  return (
    <View style={{ width: "91.5%", alignSelf: "center" }}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine width={100} color={R.colors.gray3} style={styles.placeHolderLine} />
        <PlaceholderLine width={70} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={80} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={60} color={R.colors.gray3} style={styles.placeHolderLine} />
        <PlaceholderLine width={100} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={80} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={60} color={R.colors.gray3} style={styles.placeHolderLine} />
        <PlaceholderLine width={100} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={80} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={60} color={R.colors.gray3} style={styles.placeHolderLine} />
        <PlaceholderLine width={100} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={80} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={80} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={60} color={R.colors.gray3} style={styles.placeHolderLine} />
        <PlaceholderLine width={100} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={80} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={90} color={R.colors.gray3} style={styles.placeholder} />
        <PlaceholderLine width={60} color={R.colors.gray3} style={styles.placeHolderLine} />
        <PlaceholderLine width={100} color={R.colors.gray3} style={styles.placeholder} />
      </Placeholder>
    </View>
  )
}

export default LoadingIpa
const styles = StyleSheet.create({
  placeHolderLine: {
    borderRadius: WIDTH(15),
    marginBottom: HEIGHT(25),
    marginTop: HEIGHT(10),
  },
  placeholder: {
    borderRadius: WIDTH(15),
  },
})
