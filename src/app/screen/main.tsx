import { View, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Button } from 'react-native-paper'
import BottomNavigation from '../../component/bottomnavigation'

const Main = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.calender}>
        <Calendar />
      </View>
      <View style={styles.button}>
        <Button mode='contained' onPress={() => { console.log('今日の日記') } }>
          💬今日の日記を書く
        </Button>
      </View>
      <View style={styles.bottomNaivigation}>
        <BottomNavigation/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  calender: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 12
  },
  button: {
    flex: 0,
    marginHorizontal: 12,
    marginTop: 12
  },
  bottomNaivigation: {
    flex: 1
  }
})

export default Main
