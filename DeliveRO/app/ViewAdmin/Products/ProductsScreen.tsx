import { retrieveCategories } from '@/app/api/categoriesApi';
import InlineDropdown from '@/app/components/Dropdown';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
    );
};

type Category = {
    id: string;
    name: string;
};

type Product = {
    id: string;
    name: string;
    categoryId: string;
    price: number;
    description: string;
};

const ProductsScreen: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const categoriesData: Category[] = await retrieveCategories();
            const productsData: Product[] = [
                { id: '101', name: 'Laptop1', categoryId: '1', price: 1200, description: 'A powerful laptop.' },
                { id: '102', name: 'Novel', categoryId: '2', price: 20, description: 'A best-selling novel.' },
                { id: '103', name: 'T-Shirt', categoryId: '3', price: 15, description: 'Comfortable cotton t-shirt.' },
            ];
            setCategories(categoriesData);
            setProducts(productsData);
            setSelectedCategory(categoriesData[0]?.id || '');
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleCategoryChange = (item: any) => {
        setSelectedCategory(item.categoryId);
    };

    const renderProductCard = ({ item }: { item: Product }) => (
        <TouchableOpacity style={styles.card} onPress={() => {/* Navigate to edit screen or open modal */ }}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const filteredProducts = products.filter(
        (product) => 1 === 1 || product.categoryId === selectedCategory
    );

    return (
        <View style={styles.container}>
            <View style={pickerStyles.container}>
                <InlineDropdown
                    data={categories}
                    onSelect={handleCategoryChange}
                    defaultNoOption="Select a category"
                />
            </View>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderProductCard}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text>No products found.</Text>}
            />
        </View>
    );
};

const pickerStyles = StyleSheet.create({
    container: {

        width: '100%',
    },
});

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    picker: { marginBottom: 16 },
    list: { paddingBottom: 16 },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    productName: { fontSize: 18, fontWeight: 'bold' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductsScreen;
