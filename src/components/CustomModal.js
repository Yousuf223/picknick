import React from 'react';
import Modal from 'react-native-modal';

export default function CustomModal(props) {
  return (
    <Modal
      style={props.style}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={600}
      animationOutTiming={600}
      backdropColor={props?.flatList ? 'rgba(0,0,0,0.8)' : '#000'}
      backdropOpacity={props?.backdropOpacity ? props?.backdropOpacity : 0.8}
      transparent={true}
      isVisible={props.visible}
      onBackButtonPress={props.togglePopup}
      onBackdropPress={props.togglePopup}>
      {props?.children}
    </Modal>
  );
}
