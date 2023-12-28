import React from 'react';
import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

interface modalInterface {
  setVisible: (value: boolean) => void;
  visible: boolean;
  image: string;
  handleModalOutsidePress: () => void;
}
const ModalComponent = ({
  setVisible,
  handleModalOutsidePress,
  visible,
  image,
}: modalInterface) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={handleModalOutsidePress}>
        <View style={styles.centeredView}>
          <Image style={styles.modalImage} source={{uri: image}} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    height: 160,
  },
  modalImage: {
    height: 240,
    width: 240,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default ModalComponent;
