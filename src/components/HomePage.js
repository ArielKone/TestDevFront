import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome'; // Exemple avec FontAwesome, vous pouvez utiliser une autre bibliothèque d'icônes

const HomePage = () => {
  const [isLikeModalVisible, setLikeModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const [tempLikes, setTempLikes] = useState(0); // État pour suivre les likes temporaires
  const [totalLikes, setTotalLikes] = useState(25000); // Exemple de total de likes initial

  const handleLike = () => {
    // Mettre à jour le nombre de likes temporaires
    setTempLikes(tempLikes + 1);
    // Afficher le modal de likes
    setLikeModalVisible(true);
  };

  const handleComment = () => {
    // Afficher le modal de commentaire
    setCommentModalVisible(true);
  };

  const handleCloseModal = () => {
    // Réinitialiser les likes temporaires si le modal est fermé sans liker
    setTempLikes(0);
    // Cacher le modal de likes
    setLikeModalVisible(false);
  };

  const handleConfirmLikes = () => {
    // Ajouter les likes temporaires au total des likes
    setTotalLikes(totalLikes + tempLikes);
    // Réinitialiser les likes temporaires
    setTempLikes(0);
    // Cacher le modal de likes
    setLikeModalVisible(false);
  };

  const handleSubmitComment = () => {
    // Soumettre le commentaire
    // Ici, vous pouvez implémenter la logique pour soumettre le commentaire à votre backend ou gérer localement
    // Pour cet exemple, nous allons simplement afficher le commentaire dans la console et le réinitialiser
    console.log('Comment submitted:', comment);
    setComment('');
    // Cacher le modal de commentaire
    setCommentModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logoImage} source={require('../../assets/images/logo.png')} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.logoText}>Spidi</Text>
        </View>
      </View>
      <Image style={styles.image} source={require('../../assets/images/public.png')} />
      <View style={styles.details}>
        <TouchableOpacity onPress={handleLike}>
          <Text style={styles.text}>{totalLikes + tempLikes} Likes</Text>
        </TouchableOpacity>
        <Text style={styles.text}>600 vues</Text>
      </View>
      <Text style={styles.description}>L'Afrique le soleil du monde</Text>
      <View style={styles.actions}>
        <Button title="Like" onPress={handleLike} />
        <Button title="Share" onPress={() => setShareModalVisible(true)} />
        <Button title="Comment" onPress={handleComment} />
      </View>

      <Modal isVisible={isLikeModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Likes</Text>
          <Text style={styles.emoji}>😊</Text>
          <Text style={styles.emoji}>👍</Text>
          <Text style={styles.emoji}>❤️</Text>
          <View style={styles.modalButtons}>
            <Button title="Confirm" onPress={handleConfirmLikes} />
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>

      <Modal isVisible={isShareModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Share</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="whatsapp" size={30} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="facebook" size={30} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="twitter" size={30} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Button title="Copier le lien" onPress={() => setShareModalVisible(false)} />
          <Button title="Close" onPress={() => setShareModalVisible(false)} />
        </View>
      </Modal>

      <Modal isVisible={isCommentModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Comment</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Écrivez votre commentaire..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <View style={styles.modalButtons}>
            <Button title="Submit" onPress={handleSubmitComment} />
            <Button title="Cancel" onPress={() => setCommentModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 250,
    marginLeft: 10,
  },
  logoText: {
    fontSize: 24,
  },
  image: {
    width: '90%',
    height: 450, // Adjust height as needed
    marginBottom: 40, // Increase margin bottom for additional space
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  text: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 30,
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Ensure icons are evenly spaced
    marginBottom: 20,
  },
  icon: {
    color: '#000', // Example color, adjust as needed
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default HomePage;
