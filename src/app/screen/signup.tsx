import { router } from 'expo-router'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import { _signUp } from '../../hooks/use-auth'
import { useSetRecoilState } from 'recoil'
import { carentEmail } from '../recoil/atom'

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [isPasswordMatchError, setIsPasswordMatchError] = useState(false)
  const [isPasswordLengthError, setIsPasswordLengthError] = useState(false)
  const [isPasswordFormatError, setIsPasswordFormatError] = useState(false)
  const setEmailState = useSetRecoilState(carentEmail)

  const handleRegistration = async (): Promise<void> => {
    if (password !== confirmationPassword) {
      setIsPasswordMatchError(true)
      setIsPasswordLengthError(false)
      setIsPasswordFormatError(false)
      return
    }
    if (password.length <= 6) {
      setIsPasswordLengthError(true)
      setIsPasswordMatchError(false)
      setIsPasswordFormatError(false)
      return
    }
    if (!/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
      setIsPasswordFormatError(true)
      setIsPasswordMatchError(false)
      setIsPasswordLengthError(false)
      return
    }
    try {
      console.log('email' + email)
      console.log('password' + password)
      await _signUp(email, password)
    } catch (error) {
      console.log(error)
      console.log('サインアップに失敗しました。')
      return
    }
    setEmailState(email)
    router.push('/screen/verification')
  }

  const handlePressLogin = (): void => {
    router.replace('/screen/signin')
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
        <Text
        style={styles.discriptionText}
        >パスワードは少なくとも数字、大文字、小文字を含む{'\n'}6桁以上の文字列の必要があります。</Text>
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          placeholderTextColor="#999999"
          secureTextEntry={true}
          onChangeText={newText => { setPassword(newText) }}
          defaultValue={password}
        />
        <TextInput
          style={styles.input}
          placeholder="再度同じパスワードを入力してください。"
          placeholderTextColor="#999999"
          secureTextEntry={true}
          onChangeText={newText => { setConfirmationPassword(newText) }}
          defaultValue={confirmationPassword}
        />
        {isPasswordMatchError && (
          <Text style={styles.errorText}>パスワードが一致しません。</Text>
        )}
        {isPasswordLengthError && (
          <Text style={styles.errorText}>6桁以上の文字列を入力してください。</Text>
        )}
        {isPasswordFormatError && (
          <Text style={styles.errorText}>
            パスワードは、少なくとも1つの数字、1つの大文字、1つの小文字を含む必要があります。
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          onPress={() => {
            handleRegistration().then(() => {}).catch((error) => { console.log(error) })
          }
        }>
          サインイン
        </Button>
        <TouchableOpacity
        onPress={handlePressLogin}>
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
  },
  errorText: {
    color: 'red',
    marginBottom: 20
  },
  discriptionText: {
    padding: 10,
    marginBottom: 10
  }
})

export default SignUp
