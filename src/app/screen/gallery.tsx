import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native'
import BottomNavigation from '../../component/bottomnavigation'
import { Button, Card, Paragraph, Title } from 'react-native-paper'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

const data = [
  { id: '1', title: 'プリクラ', date: '2022/1/10', image: require('../../../assets/prikura.jpg'), description: '二人でのプリクラ。髪は黒色。服は名古屋で買ったやつ' },
  { id: '2', title: '大高緑地', date: '2023/9/20', image: require('../../../assets/brachiosaurus.jpeg'), description: '大高緑地に恐竜を見に行きました。息子君は恐竜が大好きで特にブラキオサウルスが一番大好きです。福井の恐竜博物館も行きたいね。' },
  { id: '3', title: '栃木ワールドスクエア', date: '2020/1/18', image: require('../../../assets/tochigiart.jpg'), description: '栃木のワールドスクエアに行きました。世界のいろいろな場所がミニチュアであってとても楽しいところでした。' },
  { id: '4', title: 'ガーデンパーク', date: '2023/11/20', image: require('../../../assets/park.jpeg'), description: '浜名湖ガーデンパークに行きました。とても広くきれいな公園で天気が良かったです。拾った落ち葉で遊んでいました。' },
  { id: '5', title: '1歳誕生日', date: '2023/11/20', image: require('../../../assets/cake.jpg'), description: 'るいくんの1歳の誕生日でした。ホットケーキをケーキのようにクリームを塗って食べました。むしゃむしゃ食べていました。' }
]

const MONTH_ITEM_WIDTH = 60

interface CardItemProps {
  item: {
    id: string
    title: string
    date: string
    image: any
    description: string
  }
}

const CardItem = ({ item }: CardItemProps): JSX.Element => {
  const [showMore, setShowMore] = useState(false)
  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph>{item.date}</Paragraph>
      <Card.Cover source= {item.image} />
        <Paragraph numberOfLines={showMore ? 0 : 1}>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>編集</Button>
        <Button onPress={() => { setShowMore(!showMore) }}>{showMore ? '閉じる' : '開く'}</Button>
      </Card.Actions>
    </Card>
  )
}

const Gallery = (): JSX.Element => {
  // 今年の年
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [isPickerVisible, setPickerVisible] = useState(false)
  // 今年の月
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const showPicker = (): void => {
    setPickerVisible(true)
  }

  const hidePicker = (): void => {
    setPickerVisible(false)
  }

  return (
    <View style={styles.container}>
      {/* 年を表示する部分 */}
      <TouchableOpacity onPress={showPicker} style={styles.yearDisplay}>
        <Text style={{ fontSize: 24 }}>{`${selectedYear}年`}</Text>
      </TouchableOpacity>
    {/* モーダルウィンドウでピッカーを表示 */}
    <View style={styles.modalContainer}>
      <Modal
        visible={isPickerVisible}
        transparent={true}
        onRequestClose={hidePicker}
      >
        <View style={styles.modal}>
          <View>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => {
                setSelectedYear(itemValue)
                hidePicker()
              }}
            >
              {Array.from({ length: 2050 - 2023 + 1 }, (_, i) => 2023 + i).map((year) => (
                <Picker.Item key={year} label={`${year}年`} value={year} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Array.from({ length: 12 }, (_, i) => i + 1)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.monthItem,
              item === selectedMonth ? styles.selectedMonthItem : null
            ]}
            onPress={() => { setSelectedMonth(item) }}
          >
            <Text style={styles.monthText}>{`${item}月`}</Text>
          </TouchableOpacity>
        )}
        initialScrollIndex={currentMonth - 1}
        getItemLayout={(data, index) => ({
          length: MONTH_ITEM_WIDTH,
          offset: MONTH_ITEM_WIDTH * index,
          index
        })}
      />
    </View>
    <View style={styles.diaryListContainer}>
      <FlatList
          data={data}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({ item }) => (
            <CardItem item={item}/>
          )}
      />
      </View>
      <View style={styles.bottomNaivigation}>
        <BottomNavigation/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  diaryListContainer: {
    flex: 1,
    marginBottom: 80
  },
  monthListContainer: {
    flex: 1,
    marginBottom: 80
  },
  bottomNaivigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  cardStyle: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff'
  },
  yearDisplay: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)'
  },
  pickerStyle: {
    marginTop: 10
  },
  modalContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#ffffff'
  },
  monthItem: {
    width: MONTH_ITEM_WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  selectedMonthItem: {
    backgroundColor: '#EEF6ED'
  },
  monthText: {
    color: 'black'
  }
})

export default Gallery
