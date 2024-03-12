import { router } from 'expo-router'
import CustomButton from '../../component/CustoumButton'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useState } from 'react'

const handlePress = (): void => {
  router.replace('/screen/signin')
}

const Login = (): JSX.Element => {
  const [mailAdress, setMailAdress] = useState('')
  const [paswerd, setPaswerd] = useState('')
  return (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        placeholderTextColor="#999999"
        onChangeText={newText => { setMailAdress(newText) }}
        defaultValue={mailAdress}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        placeholderTextColor="#999999"
        secureTextEntry={true}
        onChangeText={newText => { setPaswerd(newText) }}
        defaultValue={paswerd}
      />
    </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="ログイン"
          onPress={() => {
            // ログイン処理
          }}
        />
        <TouchableOpacity
        onPress={handlePress}>
          <Text style={styles.text}>新規会員登録はこちら</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputContainer: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#EFF4E0'
  },
  buttonContainer: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  text: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'right'
  }
})

export default Login
