import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { getWidth, WIDTH } from '@configs/functions'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { searchListWiki } from '@redux/actions/userAction'
import R from '@assets/R'

const SearchBar = () => {
  const searchWord = useSelector((state: any) => state.searchListReducers.searchWord)
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('' || searchWord)

  const onSearch = (text: string) => {
    setValue(text)
    debouncedSearch(text)
  }

  const debouncedSearch = React.useCallback(
    debounce((text: string) => dispatch(searchListWiki({ word: text, offset: 0 })), 1000),
    []
  )

  return (
    <View style={styles.container}>
      <Text>Enter Search Term</Text>
      <TextInput
        defaultValue={value}
        style={styles.input}
        onChangeText={onSearch}
      />
    </View>
  )
}

export default SearchBar
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(12),
    paddingTop: WIDTH(8),
    width: getWidth()
  },
  input: {
    borderColor: R.colors.gray6,
    borderRadius: WIDTH(8),
    borderWidth: 1,
    marginVertical: WIDTH(6),
    width: WIDTH(343)
  }
})
