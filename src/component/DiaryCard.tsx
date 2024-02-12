import { Card, Title, Paragraph } from 'react-native-paper'

const DiaryCard = ({ date, title, imageUri }: { date: string, title: string, imageUri: string }): JSX.Element => {
  return (
    <Card>
      <Card.Cover source={{ uri: imageUri }} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{date}</Paragraph>
      </Card.Content>
    </Card>
  )
}

export default DiaryCard
