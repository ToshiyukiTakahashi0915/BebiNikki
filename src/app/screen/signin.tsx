import { router } from 'expo-router'
import CustomButton from '../../component/CustoumButton'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useState } from 'react'

const handlePress = (): void => {
  router.replace('/screen/login')
}

const Signin = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="メールアドレス"
          placeholderTextColor="#999999"
          onChangeText={newText => { setEmail(newText) }}
          defaultValue={email}
        />
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          placeholderTextColor="#999999"
          secureTextEntry={true}
          onChangeText={newText => { setPassword(newText) }}
          defaultValue={password}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="サインイン"
          onPress={() => {
            // ログイン処理
          }}
        />
        <TouchableOpacity
        onPress={handlePress}>
          <Text style={styles.text}>既に登録済みの方はこちら</Text>
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

export default Signin
