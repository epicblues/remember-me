/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import axios from 'axios';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const App = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [userInput, setUserInput] = useState({ name: '', password: '' });
  const postUser = async () => {
    console.log('clicked');
    try {
      const { data } = await axios.post(
        'http://localhost:5000/user/login',
        userInput,
      );
      console.log(data);
      setIsLogined(true);
      setUserInput({ name: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: 20,
        height: '80%',
      }}>
      {!isLogined ? (
        <>
          <Text style={{ fontSize: 40 }}>로그인 해주세요</Text>
          <Text>이름</Text>
          <TextInput
            placeholder="name"
            style={{ borderWidth: 1 }}
            value={userInput.name}
            onChangeText={e => setUserInput(s => ({ ...s, name: e }))}
          />
          <Text>비밀번호</Text>
          <TextInput
            textContentType="password"
            placeholder="Password"
            style={{ borderWidth: 1 }}
            value={userInput.password}
            onChangeText={e => setUserInput(s => ({ ...s, password: e }))}
          />
          <Button title="로그인하기" onPress={postUser} />
        </>
      ) : (
        <Button
          title="Logout"
          onPress={async () => {
            await axios.get('http://localhost:5000/user/logout');
            setIsLogined(false);
          }}
        />
      )}
    </View>
  );
};

export default App;
