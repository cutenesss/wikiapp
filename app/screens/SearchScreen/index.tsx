import { StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import SearchBar from './Components/SearchBar'
import { useSelector, useDispatch } from 'react-redux'
import ItemWiki from './Components/ItemWiki'
import { searchListWiki } from '@redux/actions/userAction'
import R from '@assets/R'
import { getWidth } from '@configs/functions'
import FooterView from './Components/FooterView'
import LoadingComponent from '@common/Loading/LoadingComponent'

const SearchScreen = () => {
  const dispatch = useDispatch()
  const searchList = useSelector((state: any) => state.searchListReducers.searchList)
  const searchWord = useSelector((state: any) => state.searchListReducers.searchWord)
  const loading = useSelector((state: any) => state.searchListReducers.loading)
  const [page, setPage] = React.useState(0)

  React.useEffect(() => {
    dispatch(searchListWiki({ word: searchWord, offset: page }))
  }, [page])

  const renderItem = React.useCallback(({ item }) => <ItemWiki item={item} />, [])

  const onChangePage = React.useCallback((value: number) => setPage(value), [])

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={< SearchBar />}
        data={searchList}
        extraData={searchList}
        keyExtractor={(item: any, index) => `${index}`}
        scrollEventThrottle={16}
        maxToRenderPerBatch={8}
        windowSize={15}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={8}
        renderItem={renderItem}
        style={styles.list}
        ListFooterComponent={<FooterView onChangePage={onChangePage} />}
      />
      <LoadingComponent isLoading={loading} />
    </View>
  )
}

export default SearchScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    flex: 1
  },
  list: {
    flex: 0,
    width: getWidth()
  }
})
