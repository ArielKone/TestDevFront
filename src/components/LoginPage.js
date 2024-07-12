import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { View, Text, TextInput, Button, StyleSheet , Image} from 'react-native';

// Define a list of countries with their country codes
const countries = [
  { name: 'Select a country', code: '' },
  // African countries
  { name: 'Algeria 🇩🇿', code: '+213' },
  { name: 'Nigeria 🇳🇬', code: '+234' },
  { name: 'South Africa 🇿🇦', code: '+27' },
  { name: 'Egypt 🇪🇬', code: '+20' },
  { name: 'Kenya 🇰🇪', code: '+254' },
  { name: 'Morocco 🇲🇦', code: '+212' },
  { name: 'Côte d\'Ivoire 🇨🇮', code: '+225' }, // Added Côte d'Ivoire
  // European countries
  { name: 'France 🇫🇷', code: '+33' },
  { name: 'Germany 🇩🇪', code: '+49' },
  { name: 'Italy 🇮🇹', code: '+39' },
  { name: 'Spain 🇪🇸', code: '+34' },
  { name: 'United Kingdom 🇬🇧', code: '+44' },
];

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCountryChange = (itemValue) => {
    setSelectedCountry(itemValue);
    // Automatically update the phone number field with the selected country code
    const country = countries.find(country => country.name === itemValue);
    if (country) {
      setPhoneNumber(country.code);
    } else {
      setPhoneNumber('');
    }
  };

  const handleLogin = () => {
    // Perform validation before navigating to home
    if (!username || !selectedCountry || !phoneNumber || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Proceed to navigate to home if all fields are filled
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')} // Replace with your actual image source
        style={styles.image}
        resizeMode="contain"
      />
      {/* <Text style={styles.logo}>Spidi</Text> */}

      {/* Dropdown for selecting countries */}
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={(text) => setUsername(text)}
        required
      />

      <Picker
        selectedValue={selectedCountry}
        style={[styles.input, styles.countryPicker]} // Apply specific style here
        onValueChange={(itemValue) => handleCountryChange(itemValue)}
      >
        {countries.map((country, index) => (
          <Picker.Item key={index} label={country.name} value={country.name} />
        ))}
      </Picker>

      {/* Phone number input */}
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        required
      />

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        required
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        required
      />
      
      {/* Button to navigate to home */}
      <Button title="Dream big make big" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginBottom: 20, // Add margin bottom for spacing
  },
  logo: {
    fontSize: 24,
    marginBottom: 24,
  },

  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  countryPicker: {
    backgroundColor: '#f0f0f0', // Set a different background color for the picker
  },
});

export default LoginPage;
