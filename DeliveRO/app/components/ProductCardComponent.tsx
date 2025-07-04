import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import constants from "../constants/constants";
import { Product } from "../ViewUser/ProductsScreen";


const renderProductCard = ({ item, addToCart }: { item: Product, addToCart: any }) => (
    <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                // Navigate to edit screen or open modal
            }}
        >
            <View style={{ marginRight: 12 }}>
                <Image
                    source={
                        item?.image?.length > 0
                            ? { uri: `data:image/png;base64,${item.image}` }
                            : { uri: constants.NO_IMAGE_URL }
                    }
                    style={{ width: 50, height: 50, borderRadius: 8, backgroundColor: '#eee' }}
                    resizeMode="cover"
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text>{item.description.substring(0, 30)}</Text>
                <Text style={{ color: 'green' }}>Price: {item.price} {constants.currency}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
        >
            <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    list: { paddingBottom: 16 },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 0,
        zIndex: 0,
    },
    productName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    productDesc: { fontSize: 14, color: '#555', marginBottom: 4 },
    productPrice: { fontSize: 16, color: '#007bff', marginBottom: 2 },
    productStock: { fontSize: 14, color: '#888' },
    addButton: {
        marginLeft: 12,
        backgroundColor: '#28a745',
        borderRadius: 18,
        width: 60,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default renderProductCard;