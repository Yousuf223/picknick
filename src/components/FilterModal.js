import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils';
import { Rating } from 'react-native-ratings';
import { appIcons } from '../assets';

const FilterModal = ({ 
  visible, 
  onClose, 
  filters, 
  setFilters, 
  applyFilters, 
  resetFilters,
  search,  // Add this prop
  setSearch  // Add this prop
}) => {
    const handleRating = (rating) => {
    // setName(rating)
    // console.log("Rating is: " + rating);
    setFilters({...filters, rating: rating})
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Search & Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Image style={{width:16,height:16,resizeMode:'containr'}} source={appIcons.close} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Add Search Input */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Search</Text>
              <TextInput
                style={styles.filterInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Search by name..."
              />
            </View>

            {/* Other filters remain the same */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Max Price ($)</Text>
              <TextInput
                style={styles.filterInput}
                value={filters.price}
                onChangeText={(text) => setFilters({...filters, price: text})}
                placeholder="Enter max price"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Min Rating</Text>
      
                     <Rating
                      showRating
                      onFinishRating={handleRating}
                      style={{ paddingVertical: 10 }}
                    />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.resetButton]}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.applyButton]}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'flex-end',
},
modalContainer: {
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  maxHeight: '80%',
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
modalContent: {
  padding: 20,
},
filterGroup: {
  marginBottom: 20,
},
filterLabel: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
  color: '#555',
},
filterInput: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 10,
  padding: 12,
  fontSize: 16,
},
ratingContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '80%',
  alignSelf: 'center',
},
modalFooter: {
  flexDirection: 'row',
  borderTopWidth: 1,
  borderTopColor: '#eee',
},
modalButton: {
  flex: 1,
  padding: 15,
  alignItems: 'center',
},
resetButton: {
  backgroundColor: '#f5f5f5',
  borderBottomLeftRadius: 20,
},
applyButton: {
  backgroundColor: colors.primary,
  borderBottomRightRadius: 20,
},
resetButtonText: {
  color: '#666',
  fontWeight: 'bold',
},
applyButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
})