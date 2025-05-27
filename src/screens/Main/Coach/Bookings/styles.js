import { StyleSheet, Dimensions } from 'react-native';
import { colors, size, family } from '../../../../utils';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  containerStyle:{
    width:'100%'
  },
  cardData:{
    backgroundColor:colors.white,
    flex:1,
    borderTopLeftRadius:28,
    borderTopRightRadius:28
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 5,
    width:'100%',
    borderWidth:1,
    borderColor:colors.lightGray1
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  bookingDetails: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  listempty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  txtlistempty: {
    fontSize: 16,
    color: '#888',
  },
  cardData: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  userImage:{
    width:50,
    height:50,
    borderRadius:100
  },
  filterButton:{
    borderWidth:2,
     height:48,
     justifyContent:'center',
     alignItems:'center',
     paddingHorizontal:10,
     width:'45%',
     borderColor:colors.primary,
     borderRadius:10,
  },
  activeFilterButton:{
    backgroundColor:colors.primary,
    width:'45%',
    height:48,
    borderWidth:1,
    borderColor:colors.primary,
    borderRadius:10,
    justifyContent:'center',
  },
  filterButtonText:{
    color:colors.white,
    fontWeight:'500'
  },
  buttonStyle:{
    width:120,
    alignSelf:'flex-end',
    marginTop:10
  },
  buttonStyle1:{
    width:120,
    alignSelf:'flex-end',
    marginTop:10,
    borderColor:colors.secondary
  }
});
export default styles;
