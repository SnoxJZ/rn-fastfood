import { Text, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { MenuItem } from '@/type';

const MenuCard = ({ item }: { item: MenuItem }) => {
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === 'android'
          ? { elevation: 10, shadowColor: '#878787' }
          : {}
      }
    >
      <Image
        source={{ uri: item.image_url }}
        className="absolute -top-10 size-32"
        resizeMode="contain"
      />
      <Text
        className="base-bold mb-2 text-center text-dark-100"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text className="body-regular mb-4 text-gray-200">
        From ${item.price}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
