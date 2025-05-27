import { saveProduct } from '@/app/api/productsApi';
import * as ImagePicker from 'expo-image-picker'; // Ensure you have expo-image-picker installed
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Product } from './ProductsScreen';



type AddEditProductScreenProps = {
    route: {
        params: {
            product: Product;
        };
    };
    navigation: any;
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4, width: 200, flex: 1 }}>{label}</Text>
        {children}
    </View>
);

const AddEditProductScreen: React.FC<AddEditProductScreenProps> = ({ route, navigation }) => {
    const editing = !!route.params?.product?.id;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: editing ? 'Edit product' : 'Add product',
        });
    }, [navigation, editing]);
    const [product, setProduct] = useState<Product>(route.params?.product);
    console.log(route);

    const handleChange = (field: keyof Product, value: string) => {
        setProduct(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!product.name || !product.price || !product.stock) {
            Alert.alert('Eroare', 'Completează toate câmpurile obligatorii.');
            return;
        }

        const addedProduct = await saveProduct(product)

        // TODO: Add API call or state update logic here
        Alert.alert('Succes', editing ? 'Produsul a fost actualizat.' : 'Produsul a fost adăugat.');
        navigation.goBack();
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
        >
            <Field label="Product name">
                <TextInput
                    style={styles.input}
                    placeholder="Product name"
                    value={product.name}
                    onChangeText={text => handleChange('name', text)}
                    returnKeyType="next"
                />
            </Field>
            <Field label="Image">
                <View>
                    {product.image ? (
                        <View style={{ alignItems: 'center', marginBottom: 8 }}>
                            <Image
                                source={{ uri: product.image }}
                                style={{ width: 120, height: 120, borderRadius: 8, marginBottom: 8 }}
                                resizeMode="cover"
                            />
                        </View>
                    ) : null}
                    <Button
                        title={product.image ? "Change Image" : "Upload Image"}
                        onPress={async () => {
                            // Use expo-image-picker or similar library
                            // This is a placeholder for demonstration
                            // Replace with your image picker logic
                            // Example with expo-image-picker:
                            const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
                            if (!result.canceled) {
                              //  handleChange('image', `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`);
                            }
                            Alert.alert('Not implemented', 'Image picker integration required.');
                        }}
                    />
                </View>
            </Field>
            <Field label="Category">
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    value={product.category || ''}
                    aria-disabled={true}
                    returnKeyType="next"
                    readOnly={true}
                    editable={false}
                />
            </Field>
            <Field label="Price">
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={product.price?.toString() || ''}
                    onChangeText={text => {
                        const num = text.replace(/[^0-9.]/g, '');
                        handleChange('price', num);
                    }}
                    keyboardType="numeric"
                    returnKeyType="next"
                    inputMode="decimal"
                />
            </Field>
            <Field label="Stock">
                <TextInput
                    style={styles.input}
                    placeholder="Stock"
                    value={product.stock?.toString() || ''}
                    onChangeText={text => {
                        const num = text.replace(/[^0-9]/g, '');
                        handleChange('stock', num);
                    }}
                    keyboardType="numeric"
                    returnKeyType="next"
                    inputMode="numeric"
                />
            </Field>
            <Field label="Description">
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Description"
                    value={product.description}
                    onChangeText={text => handleChange('description', text)}
                    multiline
                />
            </Field>
            <Button title={editing ? 'Save changes' : 'Add product'} onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
});

export default AddEditProductScreen;