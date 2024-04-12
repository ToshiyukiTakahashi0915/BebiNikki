import { router } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { bottomNavigationState } from '../app/recoil/atom'

const BottomNavigation = (): JSX.Element => {
  const setActiveTab = useSetRecoilState(bottomNavigationState)
  const activeTab = useRecoilValue(bottomNavigationState)

  const handlePress = (route: string): void => {
    setActiveTab(route)
    router.replace(`/screen/${route}`)
  }
  return (
    <View style={styles.container}>
      <IconButton
      icon={'home'}
      mode="contained"
      onPress={() => { handlePress('home') }}
      disabled={activeTab === 'home'}
      style={ { backgroundColor: activeTab === 'home' ? 'lightgray' : 'white' } } />
      <IconButton
      icon={'image-album'}
      mode="contained"
      onPress={() => { handlePress('gallery') }}
      disabled={activeTab === 'gallery'}
      style={ { backgroundColor: activeTab === 'gallery' ? 'lightgray' : 'white' } } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#EFF4E0',
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})

export default BottomNavigation
