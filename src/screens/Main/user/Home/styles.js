import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils';


const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
    width:'60%'
    // flex: 1,
  },
  searchContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 15,
    // marginTop: 10,
    // width:'100%'
  },
  filterButtonMain: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginLeft: 10,
    width:'96%',
    height:50,
    borderWidth:1,
    borderColor:colors.lightGray1,
    justifyContent:'center',paddingHorizontal:20
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  filterButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonWithValue: {
    backgroundColor: colors.primary,
  },
  activeFilterButton: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
  },
  filterButtonTextWithValue: {
    color: '#fff',
  },
  activeFilterButtonText: {
    color: colors.primary,
  },
  clearFilterIcon: {
    marginLeft: 5,
  },
  sectionContainer: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
  },
  flatListContent: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    marginTop: 10,
    color: '#888',
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardData: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
    color: '#333',
  },
});


export default styles