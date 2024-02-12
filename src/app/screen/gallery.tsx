import { View, StyleSheet, FlatList } from 'react-native'
import BottomNavigation from '../../component/bottomnavigation'
import { Button, Card, Paragraph, Title } from 'react-native-paper'
import { useState } from 'react'

const data = [
  { id: '1', title: 'プリクラ', date: '2022/1/10', image: require('../../../assets/prikura.jpg'), description: '二人でのプリクラ。髪は黒色。服は名古屋で買ったやつ' },
  { id: '2', title: '大高緑地', date: '2023/9/20', image: require('../../../assets/brachiosaurus.jpeg'), description: '大高緑地に恐竜を見に行きました。息子君は恐竜が大好きで特にブラキオサウルスが一番大好きです。福井の恐竜博物館も行きたいね。' },
  { id: '3', title: '栃木ワールドスクエア', date: '2020/1/18', image: require('../../../assets/tochigiart.jpg'), description: '栃木のワールドスクエアに行きました。世界のいろいろな場所がミニチュアであってとても楽しいところでした。' },
  { id: '4', title: 'ガーデンパーク', date: '2023/11/20', image: require('../../../assets/park.jpeg'), description: '浜名湖ガーデンパークに行きました。とても広くきれいな公園で天気が良かったです。拾った落ち葉で遊んでいました。' },
  { id: '5', title: '1歳誕生日', date: '2023/11/20', image: require('../../../assets/cake.jpg'), description: 'るいくんの1歳の誕生日でした。ホットケーキをケーキのようにクリームを塗って食べました。むしゃむしゃ食べていました。' }
]

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
  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
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
  flatListContainer: {
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
    marginHorizontal: 10
  }
})

export default Gallery
