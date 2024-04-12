import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import { _confirmSignUp } from '../../hooks/use-auth'
import { useRecoilValue } from 'recoil'
import { carentEmail } from '../recoil/atom'
import { router } from 'expo-router'

const EmailVerificationScreen = (): JSX.Element => {
  const [verificationCode, setVerificationCode] = useState('')
  const email = useRecoilValue(carentEmail)
  const [isVisible, setIsVisible] = useState(false)

  const handleVerifyEmail = async (): Promise<void> => {
    console.log('verificationCode: ' + verificationCode)
    if (verificationCode.length !== 6) {
      setIsVisible(true)
      return
    }
    try {
      console.log('verificationCode: ' + verificationCode)
      // 検証コードを使用してメールアドレスを検証
      // この関数は検証が成功した場合にtrueを返すことが期待されます
      await _confirmSignUp(email, verificationCode)
    } catch (error) {
      console.log('メールアドレスの認証に失敗しました。エラー:', error)
      Alert.alert('コードの認証に失敗しました。', 'メールアドレスに送付されたコードが正しいことを確認してください。')
      return
    }
    router.replace('/screen/home')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text
          style={styles.explanation}
        >
          入力いただいたメールアドレスに{'\n'}認証コードを送信しました。{'\n'}下記のフォームにコードを入力し{'\n'}確認ボタンをタップしてください。
          </Text>
        <TextInput
          style={styles.input}
          placeholder="認証コードを入力してください"
          onChangeText={(text) => { setVerificationCode(text) }}
          maxLength={6} // 最大6桁までの入力を許可
          keyboardType="number-pad" // 数字キーボードのみ表示
          defaultValue={verificationCode}
        />
        {isVisible && (
          <Text style={styles.errorText}>
            6桁の数字を入力してください。
          </Text>
        )}
        <Button
          mode="contained"
          onPress={() => {
            handleVerifyEmail().then(() => {}).catch((error) => { console.log(error) })
          }
        }>
          確認
        </Button>
      </KeyboardAvoidingView >
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#EFF4E0'
  },
  errorText: {
    color: 'red',
    marginBottom: 20
  },
  explanation: {
    textAlign: 'center',
    width: '80%',
    fontWeight: 'bold',
    marginBottom: 40
  }
})

export default EmailVerificationScreen
