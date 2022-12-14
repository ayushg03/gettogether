import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';

const Messages = [
    {
      id: '1',
      userName: 'Pranshu Tewari',
      userImg: require('../assets/users/user5.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'College wapash kab aa raha Gupta!',
    },
    {
      id: '2',
      userName: 'Lokesh Yadav',
      userImg: require('../assets/users/user6.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Roommate banoge??',
    },
    {
      id: '3',
      userName: 'Shardy30',
      userImg: require('../assets/users/user1.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'BTP kab submit krna hai?',
    },
    {
      id: '4',
      userName: 'Ashwinee',
      userImg: require('../assets/users/user7.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Mai Canva No.1 Designer hun...',
    },
    {
      id: '5',
      userName: 'Unknown',
      userImg: require('../assets/users/user2.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];
  

const MessagesScreen = ({navigation}) => {
  return (
    <Container>
    <FlatList 
      data={Messages}
      keyExtractor={item=>item.id}
      renderItem={({item}) => (
        <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
          <UserInfo>
            <UserImgWrapper>
              <UserImg source={item.userImg} />
            </UserImgWrapper>
            <TextSection>
              <UserInfoText>
                <UserName>{item.userName}</UserName>
                <PostTime>{item.messageTime}</PostTime>
              </UserInfoText>
              <MessageText>{item.messageText}</MessageText>
            </TextSection>
          </UserInfo>
        </Card>
      )}
    />
  </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  }
});
