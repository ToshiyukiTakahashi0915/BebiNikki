import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'
import CustomButton from '../../component/CustoumButton'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const Diary = (): JSX.Element => {
  // 日付データの取得
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  const formattedDate = `${year}/${month}/${day}`

  const [selectedImage, setSelectedImage] = useState(null)

  const pickImage = async (): Promise<void> => {
    // ユーザーにメディアライブラリへのアクセス許可を求める
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('写真へのアクセス許可が必要です！')
      return
    }

    // ImagePickerを起動
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.canceled === true) {
      return
    }

    // 選択された画像のURIをstateに保存
    setSelectedImage({ localUri: pickerResult.uri })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.dateContainer}>
          <Text variant="headlineSmall" style={styles.date}>
            {formattedDate}
          </Text>
        </View>
        <View style={styles.row}>
          <IconButton
            icon={'camera'}
            mode="contained"
            style={[styles.iconButton, { backgroundColor: 'white', borderColor: '#000000', borderWidth: 1 }]}
            onPress= {pickImage}
          />
          <CustomButton
            title="日記を保存"
            onPress={() => { console.log('保存') }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label={'タイトル'}
          />
          <TextInput
            style={[styles.input, styles.inputBody]}
            label={'日記の内容'}
            multiline={true}
            scrollEnabled={true}
          />
        </View>
      {/* 選択された画像を表示する */}
      selectedImage !== null && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage.localUri }} style={styles.image} />
        </View>
      )
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  row: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 24,
    marginRight: 24
  },
  dateContainer: {
    top: 24,
    left: 24
  },
  date: {
    fontWeight: 'bold'
  },
  iconButton: {
    right: 24
  },
  inputContainer: {
    margin: 24
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#EFF4E0'
  },
  inputBody: {
    height: 300 // 本文のTextInputの高さを指定
  },
  imagePreview: {
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    width: 200,
    height: 200
  }
})

export default Diary
