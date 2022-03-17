import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { memoStyle } from '../App.style';

const SingleMemo = () => {
  const getNewMemo = useCallback(async () => {
    let {
      data: { memo: incomingMemo },
    } = await axios.get('http://localhost:5000/memo/random');

    setMemo(() => ({
      title: incomingMemo.title,
      content: incomingMemo.content,
      count: incomingMemo.count,
    }));
  }, []);
  const [memo, setMemo] = useState({ title: '', content: '', count: 0 });
  useEffect(() => {
    getNewMemo();
  }, [getNewMemo]);

  return (
    <View>
      <Text style={memoStyle}>제목 : {memo.title}</Text>
      <Text style={memoStyle}>조회수 : {memo.count}</Text>
      <Text style={memoStyle}>내용 : {memo.content}</Text>
      <Button title="Next" onPress={getNewMemo} />
    </View>
  );
};

export default SingleMemo;
