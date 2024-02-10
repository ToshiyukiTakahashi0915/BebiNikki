import { View, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

const BottomNavigation = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <IconButton icon={'home'} mode="contained" onPress={() => { console.log('ホームボタン') }} />
      <IconButton icon={'image-album'} mode="contained" onPress={() => { console.log('アルバムボタン') }} />
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
