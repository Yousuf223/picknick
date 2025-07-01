import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fcmToken, getDeviceToken, getServices, loaderStop, searchServices, searchServicesAction } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';
import ResortCard from '../../../../components/resortCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterModal from '../../../../components/FilterModal';
import { colors } from '../../../../utils';

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    price: '',
    rating: ''
  });
  const [activeFilter, setActiveFilter] = useState(null);
  useEffect( () => {

    getDeviceToken()
    dispatch(loaderStop());
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchServices();
    }
  }, [isFocused]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        handleSearch();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);





  const resetFilters = () => {
    setFilters({
      name: '',
      price: '',
      rating: ''
    });
    fetchServices();
    setFilterModalVisible(false);
  };

   const fetchServices = () => {
    dispatch(
      getServices(response => {
        console.log('responseresponse',response)
        setData(response?.data);
      })
    );
  };

  const handleSearch = () => {
    dispatch(
      searchServicesAction({ name: search }, response => {
        setData(response);
      })
    );
  };

  const applyFilters = () => {
    // Combine search text with other filters if needed
    const searchParams = { 
      ...filters,
      name: filters.name || search // Use filter name if set, otherwise use search text
    };
    
    dispatch(
      searchServicesAction(searchParams, response => {
        setData(response?.data);
        setFilterModalVisible(false);
      })
    );
  };

  const renderCard = ({ item }) => {
    return <ResortCard item={item} />;
  };

  const FilterButton = ({ type, label }) => {
    const isActive = activeFilter === type;
    const hasValue = filters[type] !== '';
    
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          isActive && styles.activeFilterButton,
          hasValue && styles.filterButtonWithValue
        ]}
        onPress={() => setActiveFilter(type)}
      >
        <Text style={[
          styles.filterButtonText,
          isActive && styles.activeFilterButtonText,
          hasValue && styles.filterButtonTextWithValue
        ]}>
          {label} {hasValue && `: ${filters[type]}`}
        </Text>
        {hasValue && (
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              setFilters(prev => ({...prev, [type]: ''}));
            }}
            style={styles.clearFilterIcon}
          >
            <Icon name="close" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <AppBackground
      menu
      title={'Discover'}
      Cart={true}
      appLogo={false}
      notification
      marginHorizontal={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.filterButtonMain}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={{color:colors.black,fontSize:12}}>Search</Text>
          </TouchableOpacity>
        </View>



        {/* Popular Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Places</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {data?.length > 0 ? (
            <FlatList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCard}
              contentContainerStyle={styles.flatListContent}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              {/* <Icon name="emoticon-sad-outline" size={50} color="#888" /> */}
              <Text style={styles.noResultsText}>No results found</Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
         search={search}          // Pass search props
  setSearch={setSearch}  
      />
    </AppBackground>
  );
};

export default Home;