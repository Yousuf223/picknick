import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {family} from '../utils/sizes';

const CustomText = ({
  text = '',
  size = 16,
  style = {},
  font = 'Jost_Regular',
  onPress = undefined,
  color,
  expandable = false,
  intialLength = 100,
}) => {
  const {colors} = useTheme();
  const [textData, setTextData] = useState(text);

  useEffect(() => {
    if (expandable) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  }, [text]);

  const toggleExpandable = () => {
    if (textData.length == text.length) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  };

  const actionBtnLable =
    textData.length == text.length ? 'Show Less' : 'See more';
  return (
    <Text
      onPress={onPress ?? undefined}
      style={{
        fontSize: size,
        color: color ?? colors.text,
        fontFamily: family[font],
        ...style,
      }}>
      {textData}
      {expandable ? '  ' : ''}
      {expandable && (
        <Text
          onPress={toggleExpandable}
          style={{
            color: colors.notification,
            textDecorationLine: 'underline',
            fontFamily: family[font],
          }}>
          {actionBtnLable}
        </Text>
      )}
    </Text>
  );
};

export default CustomText;
