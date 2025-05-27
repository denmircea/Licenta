import { retrieveCategories } from '@/app/api/categoriesApi';
import { retrieveAllProducts } from '@/app/api/productsApi';
import InlineDropdown from '@/app/components/Dropdown';
import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Category = {
    id: string;
    name: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    categoryID: string;
    price: number;
    image: string | null;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;
    stock: number,
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

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            const fetchData = async () => {
                const categoriesData: Category[] = await retrieveCategories();
                const productsData: Product[] = await retrieveAllProducts();
                setCategories(categoriesData);
                setProducts(productsData);
                setLoading(false);
            };
            fetchData();
        }
    }, [isFocused]);

    const handleCategoryChange = (item: any) => {
        setSelectedCategory(item);
    };

    const renderProductCard = ({ item }: { item: Product }) => (
        <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                    // Navigate to edit screen or open modal
                }}
            >
                <Text style={styles.productName}>{item.name}</Text>
                <Text>{item.description.substring(0, 30)}</Text>
                <Text>Price: ${item.price}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginLeft: 12,
                    backgroundColor: '#007bff',
                    borderRadius: 18,
                    width: 36,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    // Edit button action: navigate to edit screen or open modal
                    setProductData(item);
                    props.navigation.navigate('AddEditProduct', { product: item });
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>✎</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    const filteredProducts = products.filter(
        (product) => product.categoryID === selectedCategory
    );
    console.log(products, filteredProducts);
    console.log(selectedCategory, 'selectedCategory');
    return (
        <View style={styles.container}>
            <View style={[pickerStyles.container, { flexDirection: 'row', alignItems: 'center', marginBottom: 16 }]}>
                <View style={{ flex: 1 }}>
                    <InlineDropdown
                        data={categories}
                        onSelect={handleCategoryChange}
                        selectedOptionInitial={categories.find(cat => cat.id === selectedCategory)?.name || ''}
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
                                id: '',
                                name: '',
                                description: '',
                                categoryID: selectedCategory,
                                category: categories.find(cat => cat.id === selectedCategory)?.name || '',
                                price: 0,
                                image: '',
                                stock: 0,
                            };

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
