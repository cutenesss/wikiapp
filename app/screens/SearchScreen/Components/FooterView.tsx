import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { getWidth, HEIGHT } from '@configs/functions'
import R from '@assets/R'

interface Props {
    onChangePage:(val: number) => void
}

const INIT_DATA = [-3, -2, 0, 1, 2, 3, 4, -1, 9]

const handleData = (page: number, listData: Array<number>) => {
  const newListData: Array<number> = [...listData]
  const maxPage = listData[8]
  const minPage = listData[2]
  if (maxPage - page <= 2) {
    newListData[3] = page - 1
    newListData[4] = page
    newListData[5] = page + 1
    newListData[6] = page + 2
    newListData[7] = page + 4
    newListData[8] = page + 3
  }
  if (page - minPage > 2) {
    newListData[2] = -1
    newListData[3] = page - 1
    newListData[4] = page
    newListData[5] = page + 1
    newListData[6] = page + 2
  }
  return newListData
}

const FooterView = (props: Props) => {
  const { onChangePage } = props
  const [page, setPage] = useState(0)
  const listData = useRef(INIT_DATA)

  const onChangeCurrentPage = (item: number) => {
    const newListData = handleData(item, listData.current)
    listData.current = newListData
    setPage(item)
    onChangePage(item)
  }

  const renderItem = React.useCallback(({ item }) => {
    const backgroundColor = item === page ? R.colors.whitece : R.colors.whiteFC
    switch (item) {
      case -3:
        return (
            <TouchableOpacity style={styles.item} onPress={() => onChangeCurrentPage(0)}>
                <Text>{'<<'}</Text>
            </TouchableOpacity>
        )
      case -2:
        return (
            <TouchableOpacity style={styles.item} onPress={() => onChangeCurrentPage(page - 1)}>
                <Text>{'<'}</Text>
            </TouchableOpacity>
        )
      case -1:
        return (
            <TouchableOpacity style={styles.item} disabled={true}>
                <Text>{'…'}</Text>
            </TouchableOpacity>
        )

      default:
        return (
            <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={() => onChangeCurrentPage(item)}>
                <Text>{item + 1}</Text>
            </TouchableOpacity>
        )
    }
  }, [page])

  return (
      <FlatList
        horizontal={true}
        keyExtractor={(item: number, index: number) => `${index}`}
        renderItem={renderItem}
        data={listData.current}
        extraData={page}
        scrollEnabled={false}
        bounces={false}
        style={styles.container}
      />
  )
}

export default FooterView
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 0,
    marginVertical: HEIGHT(6),
    width: getWidth(),
  },
  item: {
    alignItems: 'center',
    borderRightWidth: 1,
    height: getWidth() / 9,
    justifyContent: "center",
    width: getWidth() / 9,
  }
})
