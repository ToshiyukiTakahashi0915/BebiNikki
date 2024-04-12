import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface CustomButtonProps {
  onPress: any
  title: string
}

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const { title, onPress } = props
  return (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#BED182',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16
  }
})

export default CustomButton
