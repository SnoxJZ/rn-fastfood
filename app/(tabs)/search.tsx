import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '@/lib/useAppwrite';
import { getCategories, getMenu } from '@/lib/appwrite';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import CartButton from '@/components/CartButton';
import cn from 'clsx';
import MenuCard from '@/components/MenuCard';
import { Category, MenuItem } from '@/type';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data, error, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstItemRightColItem = index % 2 === 0;
          return (
            <View
              className={cn(
                'max-w-[48%] flex-1',
                !isFirstItemRightColItem ? 'mt-10' : 'mt-0',
              )}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between w-full flex-row">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start mt-0.5 flex-row gap-x-1">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />
            <Filter categories={categories as unknown as Category[]} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results.</Text>}
      />
    </SafeAreaView>
  );
};
export default Search;
