import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CustomMultiSelect = ({ options, selectedValues, onSelectionChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleOption = (name) => {
    let updatedSelection = [];
    if (selectedValues.includes(name)) {
      updatedSelection = selectedValues.filter((item) => item !== name);
    } else {
      updatedSelection = [...selectedValues, name];
    }
    onSelectionChange(updatedSelection);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => toggleOption(item.name)}
    >
      <Text style={styles.optionText}>{item.name}</Text>
      {/* {selectedValues.includes(item.id) ? (
        <Ionicons name="checkbox-outline" size={20} color="green" />
      ) : (
        <Ionicons name="square-outline" size={20} color="gray" />
      )} */}
    </TouchableOpacity>
  );

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.name))
    .map((option) => option.name)
    .join(', ');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.dropdownText}>
          {selectedLabels.length > 0 ? selectedLabels : 'Pick Services'}
        </Text>
        {/* <Ionicons
          name={isDropdownVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color="black"
        /> */}
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={renderOption}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  optionText: {
    fontSize: 14,
    color: 'black',
  },
});

export default CustomMultiSelect;
