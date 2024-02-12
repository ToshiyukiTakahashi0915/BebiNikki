import { Stack } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { RecoilRoot } from 'recoil'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // ボタンなどの色
    primary: '#BED182',
    // リストなどの背景色
    background: '#EFF4E0',
    // カードなどの色
    surface: '#E7EED1',
    backdrop: '#EFF4E0'
  }
}

const Layout = (): JSX.Element => {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: '#EFF4E0'
          },
          headerTitleAlign: 'center',
          headerTintColor: '#000000',
          headerTitle: 'べびにっき📖',
          headerBackTitle: '戻る',
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'normal'
          }
        }}/>
      </PaperProvider>
    </RecoilRoot>
  )
}

export default Layout
