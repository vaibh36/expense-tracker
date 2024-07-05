import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native';
import TotalExpenseCard from '../components/TotalExpenseCard';
import { ExpensesContext } from '../context/ExpensesContext';

const ExpenseListing = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { expenses, getExpenses, hasMore, setHasMore } = useContext(ExpensesContext);

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const response = await getExpenses(page, 10);
    if (response) {
      setPage((prev) => prev + 1);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const renderExpenseItem = (itemData) => {
    return <TotalExpenseCard {...itemData.item} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item, index) => item.id + '-' + index}
        onEndReached={fetchData}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseListing;
