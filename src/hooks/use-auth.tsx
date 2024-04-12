import { Amplify } from 'aws-amplify'
import { signUp, confirmSignUp, signIn, signOut } from 'aws-amplify/auth'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_ugMLb8V7d',
      userPoolClientId: '3crqcb9piop4risvujvojoqt44'
    }
  }
})

// // パスワードリセット
// export const resetPassword = async (username: string): Promise<void> => {
//   await Auth.resetPassword({ username })
// }

// サインアウト
export const _signOut = async (): Promise<void> => {
  await signOut({ global: true })
}

// 二回目以降
export const _signIn = async (username: string, password: string): Promise<void> => {
  await signIn({
    username,
    password,
    options: { authFlowType: 'USER_PASSWORD_AUTH' }
  })
}

// 初回
export const _signUp = async (username: string, password: string): Promise<void> => {
  await signUp({ username, password })
}

// ユーザーのメールアドレスを検証する関数
export const _confirmSignUp = async (username: string, confirmationCode: string): Promise<void> => {
  await confirmSignUp({ username, confirmationCode })
}
