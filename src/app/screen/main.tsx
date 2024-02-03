import { View, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

const main = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Calendar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default main
