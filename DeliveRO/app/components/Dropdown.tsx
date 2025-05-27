import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const InlineDropdown = ({ data, onSelect, defaultNoOption, selectedOptionInitial }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if(selectedOptionInitial) {
            setSelectedValue(selectedOptionInitial);
        }
    },[])
    const handleSelect = (item) => {
        setSelectedValue(item.name);
        onSelect(item.id);
        setDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setDropdownVisible(true)}>
                <Text>
                    {selectedValue || defaultNoOption || "Select an option"}{" "}
                </Text>
            </TouchableOpacity>
            <Modal
                visible={isDropdownVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setDropdownVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalDropdown}>
                    <FlatList
                        data={data}
                        style={{border: '1px solid rgba(0, 0, 0, 1)'}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelect(item)} style={{ backgroundColor: item.name === selectedValue ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}>
                                <Text style={styles.optionText}>{`${item.name}${item.name === selectedValue ? ' (Selected)' : ''}`}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        position: "relative",
    },
    button: {
        padding: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    modalDropdown: {
        position: "absolute",
        top: 100, // You may want to calculate this dynamically
        left: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 10,
        maxHeight: 300,
        zIndex: 9999,
        alignSelf: "center",
    },
    optionText: {
        fontSize: 16,
        padding: 15,
        paddingLeft: 10,
    },
});

export default InlineDropdown;
