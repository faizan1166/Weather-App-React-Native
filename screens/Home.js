import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {Title, Card} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = props => {
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    name: 'loading...',
    temp: 'loading...',
    humidity: 'loading...',
    desc: 'loading...',
    icon: 'loading...',
  });
  const handleBack = () => {
    navigation.navigate('search');
  };
  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    getWeather();
  }, [handleBack]);

  const getWeather = async () => {
    let MyCity = await AsyncStorage.getItem('newcity');
    if (!MyCity) {
      const {city} = props.route.params;
      MyCity = city;
    }
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${MyCity}&units=metric&appid=4ebb9418ca605fa1931880e565ec065c`,
    )
      .then(data => data.json())
      .then(results => {
        console.log(results);
        setInfo({
          name: results.name,
          temp: results.main.temp,
          humidity: results.main.humidity,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
        });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header name="Weather App" />
      <View style={{alignItems: 'center'}}>
        <Title style={{color: '#00aaff', marginTop: 30, fontSize: 30}}>
          {info.name}
        </Title>
        <Image
          style={{width: 120, height: 120}}
          source={{
            uri: 'https://openweathermap.org/img/w/' + info.icon + '.png',
          }}
        />
      </View>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}>Temprature - {info.temp}</Title>
      </Card>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}>Humidity - {info.humidity}</Title>
      </Card>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}>Description - {info.desc}</Title>
      </Card>
      <TouchableOpacity>
        <Card
          style={{
            margin: 10,
            padding: 8,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={handleBack}>
          <Title style={{color: '#00aaff'}}>Go Back</Title>
        </Card>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
