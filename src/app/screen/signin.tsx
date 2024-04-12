import { router } from 'expo-router'
import CustomButton from '../../component/CustoumButton'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { _signIn, _signOut } from '../../hooks/use-auth'
import { Text, TextInput } from 'react-native-paper'
import { useState } from 'react'

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const handleSignin = async (): Promise<void> => {
    try {
      console.log('email' + email)
      console.log('password' + password)
      await _signOut()
      await _signIn(email, password)
    } catch (error) {
      console.log(error)
      console.log('サインアップに失敗しました。')
      return
    }
    router.replace('/screen/home')
  }

  const handlePress = (): void => {
    router.replace('/screen/signup')
  }
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
        onChangeText={newText => { setpassword(newText) }}
        defaultValue={password}
      />
    </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="ログイン"
          onPress={() => {
            handleSignin().then(() => {}).catch((error) => { console.log(error) })
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

export default SignIn
