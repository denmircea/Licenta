import { retrieveCategories } from '@/app/api/categoriesApi';
import { retrieveAllProducts } from '@/app/api/productsApi';
import InlineDropdown from '@/app/components/Dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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


const ProductsScreen: React.FC = (props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [productData, setProductData] = useState<Product | null>(null);
    const ProductsNavigator = createNativeStackNavigator();
    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const categoriesData: Category[] = await retrieveCategories();
            const productsData: Product[] = await retrieveAllProducts();
            setCategories(categoriesData);
            setProducts(productsData);
        //    setSelectedCategory(categoriesData[0]?.id || '');
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleCategoryChange = (item: any) => {
        setSelectedCategory(item);
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
        (product) => product.categoryId === selectedCategory
    );
   console.log(selectedCategory, 'selectedCategory');
    return (
        <View style={styles.container}>
            <View style={[pickerStyles.container, { flexDirection: 'row', alignItems: 'center', marginBottom: 16 }]}>
                <View style={{ flex: 1 }}>
                    <InlineDropdown
                        data={categories}
                        onSelect={handleCategoryChange}
                    />
                </View>
                {(selectedCategory?.length > 0) && (
                    <TouchableOpacity
                        style={{
                            marginLeft: 12,
                            backgroundColor: '#007bff',
                            borderRadius: 18,
                            width: 36,
                            height: 36,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}

                        onPress={() => {
                            // open a modal for add/edit product
                            const newProduct: Product = {
                                id: null,
                                name: '',
                                categoryId: selectedCategory,
                                category: categories.find(cat => cat.id === selectedCategory)?.name || '',
                                price: 0,
                                description: '',
                            };
                            // Navigate to add product screen
                            // Assuming you're using React Navigation
                            // and have access to the navigation prop
                            setProductData(newProduct);
                            console.log(newProduct);
                            props.navigation.navigate('AddEditProduct', { product: newProduct });

                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
                            <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold', lineHeight: 36, textAlign: 'center', paddingBottom: 9 }}>+</Text>
                        </View>
                    </TouchableOpacity>
                )}
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
        elevation: 0,
        zIndex: 0,
    },
    productName: { fontSize: 18, fontWeight: 'bold' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductsScreen;
