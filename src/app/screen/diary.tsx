import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native'
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const ImagePreview = (): JSX.Element => {
    if (selectedImage === null) {
      return (
        <Text>画像が選択されていません。</Text>
      )
    } else {
      return (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )
    }
  }

  const pickImage = async (): Promise<void> => {
    // ImagePickerを起動
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
    await Promise.resolve()
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
            style={[styles.iconButton, { backgroundColor: 'white' }]}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onPress= {pickImage}
          />
          <CustomButton
            title="日記を保存"
            onPress={() => { console.log('保存') }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTitle}
            label={'タイトル'}
          />
          <TextInput
            style={styles.inputBody}
            label={'日記の内容'}
            multiline={true}
            scrollEnabled={true}
          />
        </View>
        {/* 選択された画像を表示する */}
        <View style={styles.imagePreview}>
          <ImagePreview/>
        </View>
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
    right: 12
  },
  inputContainer: {
    margin: 24
  },
  inputTitle: {
    marginBottom: 12,
    backgroundColor: '#EFF4E0'
  },
  inputBody: {
    backgroundColor: '#EFF4E0',
    height: 300 // 本文のTextInputの高さを指定
  },
  imagePreview: {
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200
  }
})

export default Diary
