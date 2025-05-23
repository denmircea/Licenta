import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const InlineDropdown = ({ data, onSelect, defaultNoOption }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
    const handleSelect = (item) => {
        setSelectedValue(item.name);
        onSelect(item.id);
        setDropdownVisible(false);
    };
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
                    <Text>
                        {selectedValue || defaultNoOption || "Select an option"}{" "}
                    </Text>
                </TouchableOpacity>
                {isDropdownVisible && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </>
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
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    dropdown: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 1000,
        marginTop: 5,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
        padding: 3,
        paddingLeft: 10,
    },
});

export default InlineDropdown;