import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const Search = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);

  const fetchCities = text => {
    setCity(text);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=4ebb9418ca605fa1931880e565ec065c`,
    )
      .then(item => item.json())
      .then(cityData => {
        setCities(cityData);
        console.log(cities);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };
  const btnClick = async () => {
    await AsyncStorage.setItem('newcity', city);
    navigation.navigate('home', {city: city});
  };
  const listClick = async cityname => {
    setCity(cityname);
    await AsyncStorage.setItem('newcity', cityname);
    navigation.navigate('home', {city: cityname});
  };

  return (
    <View style={{flex: 1}}>
      <Header name="Search Screen" />
      <TextInput
        theme={{colors: {primary: '#00aaff'}}}
        label="city name"
        value={city}
        onChangeText={e => {
          fetchCities(e)
        }}
      />
      <Button
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}
        icon="content-save"
        mode="contained"
        onPress={() => btnClick()}>
        Press
      </Button>

      <Text onPress={() => listClick(cities.name)}>{cities.name}</Text>
     <FlatList
     data={cities}
     renderItem={({item}) => {
        return(
            <Text>{item.name}</Text>
        )
     }}
     />
    </View>
  );
};

export default Search;
