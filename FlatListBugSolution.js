//FlatListBugSolution.js
import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';

const FlatListBugSolution = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  if (error) {
    return (
      <View>
        <Text>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View>
       <Text>{item.title}</Text> 
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};

export default FlatListBugSolution;