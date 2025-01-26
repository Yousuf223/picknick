import { StyleSheet, Dimensions } from 'react-native';
import { colors, size, family } from '../../../../utils';
import { dec } from 'ramda';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: width - 40, 
    height: 250,
    borderRadius: 10, 
  },
  iconContainer: {
    position: 'absolute',
    top: 25,
    right: 20,
    flexDirection: 'row',
  },
  iconContainer1:{
    position: 'absolute',
    top: 25,
    left: 20,
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 3,
    width:36,
    height:36,
    justifyContent:'center',alignItems:'center'
  },
  iconText: {
    fontSize: 18,
    color: '#ff0000',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 13,
    color: '#777',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 22,
    marginVertical: 10,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  serviceItem: {
    width: '50%',
    marginBottom: 10,
    flexDirection: 'row',
  },
  serviceText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticBg: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default styles;