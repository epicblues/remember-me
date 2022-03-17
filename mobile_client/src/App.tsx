/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { inputStyle, mainStyle, titleStyle } from './App.style';
import SingleMemo from './component/SingleMemo';
import { UserService } from './service/userService';

interface AppProps {
  userService: UserService;
}

const App: React.FC<AppProps> = ({ userService }) => {
  const [isLogined, setIsLogined] = useState(() => !userService.name);
  const [userInput, setUserInput] = useState({ name: '', password: '' });

  const postUser = async () => {
    console.log('clicked');
    try {
      await userService.login(userInput.name, userInput.password);
      setIsLogined(true);
      setUserInput({ name: '', password: '' });
    } catch (error) {
      const message = (error as AxiosError).response?.data;
      console.log(message);
      setUserInput({
        name: JSON.stringify(message.message),
        password: '' + message.statusCode,
      });
    }
  };

  return (
    <View style={mainStyle}>
      {!isLogined ? (
        <>
          <Text style={titleStyle}>로그인 해주세요</Text>
          <Text>이름</Text>
          <TextInput
            placeholder="name"
            style={inputStyle}
            value={userInput.name}
            onChangeText={e => setUserInput(s => ({ ...s, name: e }))}
          />
          <Text>비밀번호</Text>
          <TextInput
            textContentType="password"
            placeholder="Password"
            style={inputStyle}
            value={changeToPasswordStyle(userInput.password)}
            onChangeText={e => {
              setUserInput(s => ({
                ...s,
                password:
                  s.password.length < e.length
                    ? s.password + e[e.length - 1]
                    : s.password.substring(0, s.password.length - 1),
              }));
            }}
          />
          <Button title="로그인하기" onPress={postUser} />
        </>
      ) : (
        <>
          <Text children={userService.name + '님 환영합니다.'} />
          <SingleMemo />
          <Button
            title="Logout"
            onPress={async () => {
              await userService.logout();
              setIsLogined(false);
            }}
          />
        </>
      )}
    </View>
  );
};

function changeToPasswordStyle(input: string) {
  const buffer = [];
  for (let i = 0; i < input.length; i++) {
    buffer.push('*');
  }
  return buffer.join('');
}

export default App;
