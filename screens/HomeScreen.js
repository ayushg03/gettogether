import React, { useState,useEffect} from 'react';
import {View, Text, TouchableOpacity,FlatList, Platform, StyleSheet, SafeAreaViewComponent, SafeAreaView,ScrollView,Alert} from 'react-native';
import { Container } from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostCard from '../components/PostCard';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Posts=[{
  id: '1',
  userName: 'Shardy30',
  userImg: require('../assets/users/user1.jpg'),
  postTime: '4 mins ago',
  post:
    'Ek Collector, ek Minister aur ek Thanedar',
  postImg: require('../assets/posts/post7.jpg'),
  liked: true,
  likes: '14',
  comments: '5',
},
{
  id: '2',
  userName: 'Ayush Gupta',
  userImg: require('../assets/users/user4.jpg'),
  postTime: '2 hours ago',
  post:
    'Hey there, this is my test for a post of my social app in React Native.',
  postImg: 'none',
  liked: false,
  likes: '8',
  comments: '0',
},
{
  id: '3',
  userName: 'OWASP RGIPT',
  userImg: require('../assets/users/user3.jpg'),
  postTime: '1 hours ago',
  post:
    'Hey there, this is my test for a post of my social app in React Native.',
  postImg: require('../assets/posts/post6.jpg'),
  liked: true,
  likes: '1',
  comments: '0',
},
{
  id: '4',
  userName: 'RGIPT Jais',
  userImg: require('../assets/posts/post4.jpg'),
  postTime: '1 day ago',
  post:
    'Hey there, this is my test for a post of my social app in React Native.',
  postImg: require('../assets/posts/post4.jpg'),
  liked: true,
  likes: '22',
  comments: '4',
},
{
  id: '5',
  userName: 'Unknown',
  userImg: require('../assets/users/user2.jpg'),
  postTime: '2 days ago',
  post:
    'Hey there, this is my test for a post of my social app in React Native.',
  postImg: 'none',
  liked: false,
  likes: '0',
  comments: '0',
},]
const HomeScreen = ({navigation}) => {
  let [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
 const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime.toDate().toDateString(),
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);
  

      if (loading) {
        setLoading(false);
      }

      // console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, null);
  
  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);
 
  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  }
  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };



  
  const ListHeader = () => {
    return null;
  };
  return (
   <SafeAreaView>
      <FlatList
      data={posts}
      renderItem={({item})=><PostCard item={item}   onDelete={handleDelete} onPress={()=>navigation.navigate('HomeProfile',{userId: item.userId})}/>}
      keyExtractor={item=>item.id}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListHeader}
      showsVerticalScrollIndicator={false}
      />
   </SafeAreaView>
  );
};

export default HomeScreen;

