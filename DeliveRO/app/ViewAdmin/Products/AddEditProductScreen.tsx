import { saveProduct } from '@/app/api/productsApi';
import * as ImagePicker from 'expo-image-picker'; // Ensure you have expo-image-picker installed
import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
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

    const handleChange = (field: keyof Product, value: string) => {
        setProduct(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!product.name || !product.price ) {
            Alert.alert('Eroare', 'Completează toate câmpurile obligatorii.');
            return;
        }

        const addedProduct = await saveProduct(product)

        // TODO: Add API call or state update logic here
        Alert.alert('Succes', editing ? 'Produsul a fost actualizat.' : 'Produsul a fost adăugat.');
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
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
                        returnKeyType="done"
                    />
                </Field>
                <Field label="Image">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {product.image ? (
                            <Image
                                source={{ uri: `data:image/png;base64,${product.image}` }}
                                style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
                                resizeMode="cover"
                            />
                        ) : null}
                        <Button
                            title={product.image ? "Change Image" : "Upload Image"}
                            onPress={async () => {
                                const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
                                if (!result.canceled) {
                                    const base64image = result.assets[0].base64;
                                    if (base64image) {
                                        handleChange('image', base64image);
                                    }
                                }
                            }}
                        />
                    </View>
                </Field>
                <Field label="Category">
                    <TextInput
                        style={[styles.input, { color: '#333' }]}
                        placeholder="Category"
                        value={product.category || ''}
                        returnKeyType="next"
                        readOnly={true}
                        editable={false}
                        placeholderTextColor="#888"
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
                        returnKeyType="done"
                        inputMode="decimal"
                    />
                </Field>
                <Field label="Description">
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Description"
                        value={product.description}
                        onChangeText={text => handleChange('description', text)}
                        multiline
                        returnKeyType="done"

                    />
                </Field>
                <Button title={editing ? 'Save changes' : 'Add product'} onPress={handleSave} />
        </ScrollView>
            </KeyboardAvoidingView>
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