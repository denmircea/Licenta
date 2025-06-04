import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { retrieveAdministrationAnalytics } from '../api/analyticsApi';
// Example: import { LineChart, BarChart } from 'react-native-chart-kit'; // If you use a chart library
interface ChartData {
    date: string; // ISO string, since JS doesn't have DateTime type
    value: number;
}

interface BarChartData {
    label: string;
    value: number;
}

interface AnalyticsResponse {
    loginData: Record<number, ChartData[]>;
    salesData: ChartData[];
    categorySales: BarChartData[];
    topDeliveryUsers: BarChartData[];
}
const SalesScreen: React.FC = () => {
    // You can fetch your chart data here using useEffect and useState
    // For now, just show placeholders

    // Example loading state
    const [loading, setLoading] = React.useState(false);
    const [chartData, setChartData] = React.useState<AnalyticsResponse>(null as any);

    // Example chart data (replace with real data)
    // const data = {...};
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const data = await retrieveAdministrationAnalytics();
            setChartData(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    {/* Sales Over Time Chart */}
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Sales Over Time</Text>
                        {chartData && chartData.salesData && chartData.salesData.length > 0 ? (
                            <View>
                                <LineChart
                                    data={{
                                        labels: chartData.salesData.map(item => item.date.split('T')[0]),
                                        datasets: [
                                            {
                                                data: chartData.salesData.map(item => item.value),
                                            },
                                        ],
                                    }}
                                    width={Dimensions.get('window').width - 48}
                                    height={180}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    chartConfig={{
                                        backgroundColor: '#f7f7f7',
                                        backgroundGradientFrom: '#f7f7f7',
                                        backgroundGradientTo: '#e0e0e0',
                                        decimalPlaces: 0,
                                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 8,
                                        },
                                        propsForDots: {
                                            r: '4',
                                            strokeWidth: '2',
                                            stroke: '#007AFF',
                                        },
                                    }}
                                    bezier
                                    style={{
                                        borderRadius: 8,
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Text>No sales data available</Text>
                            </View>
                        )}
                    </View>

                    {/* Login Data Multi-Line Chart */}
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Logins Over Time by User Type</Text>
                        {chartData && chartData.loginData && Object.keys(chartData.loginData).length > 0 ? (
                            <LineChart
                                data={{
                                    labels: (() => {
                                        // Get all unique dates from all user types, sorted
                                        const allDates = Object.values(chartData.loginData)
                                            .flat()
                                            .map(item => item.date.split('T')[0]);
                                        const uniqueDates = Array.from(new Set(allDates)).sort();
                                        return uniqueDates;
                                    })(),
                                    datasets: [0, 1, 2].map(userType => {
                                        const userData = chartData.loginData[userType] || [];
                                        // Map date to value for this userType
                                        const dateToValue: Record<string, number> = {};
                                        userData.forEach(item => {
                                            dateToValue[item.date.split('T')[0]] = item.value;
                                        });
                                        // Fill missing dates with 0, ensure integer values
                                        const labels = (() => {
                                            const allDates = Object.values(chartData.loginData)
                                                .flat()
                                                .map(item => item.date.split('T')[0]);
                                            return Array.from(new Set(allDates)).sort();
                                        })();
                                        return {
                                            data: labels.map(date => Math.trunc(dateToValue[date] ?? 0)),
                                            color: (opacity = 1) => {
                                                // Assign a color per userType
                                                if (userType === 0) return `rgba(0, 122, 255, ${opacity})`;
                                                if (userType === 1) return `rgba(52, 199, 89, ${opacity})`;
                                                return `rgba(255, 149, 0, ${opacity})`;
                                            },
                                            strokeWidth: 2,
                                        };
                                    }),
                                    legend: ['User', 'Delivery', 'Adm.'],
                                }}
                                width={Dimensions.get('window').width - 48}
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                chartConfig={{
                                    backgroundColor: '#f7f7f7',
                                    backgroundGradientFrom: '#f7f7f7',
                                    backgroundGradientTo: '#e0e0e0',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                                    style: {
                                        borderRadius: 8,
                                    },
                                    propsForDots: {
                                        r: '4',
                                        strokeWidth: '2',
                                        stroke: '#fff',
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: '', // solid lines
                                    },
                                }}
                                bezier
                                style={{
                                    borderRadius: 8,
                                }}
                                fromZero
                                yAxisInterval={1} // step for dataset view should be integer
                            />
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Text>No login data available</Text>
                            </View>
                        )}
                    </View>

                    {/* Top Products Placeholder */}
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Top Categories</Text>
                        {chartData && chartData.categorySales && chartData.categorySales.length > 0 ? (
                            <BarChart
                                data={{
                                    labels: chartData.categorySales.map(item => item.label),
                                    datasets: [
                                        {
                                            data: chartData.categorySales.map(item => item.value),
                                        },
                                    ],
                                }}
                                width={Dimensions.get('window').width - 48}
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                chartConfig={{
                                    backgroundColor: '#f7f7f7',
                                    backgroundGradientFrom: '#f7f7f7',
                                    backgroundGradientTo: '#e0e0e0',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                                    style: {
                                        borderRadius: 8,
                                    },
                                    propsForDots: {
                                        r: '0',
                                    },
                                }}
                                style={{
                                    borderRadius: 8,
                                }}
                                fromZero
                                withDots={false}
                                withShadow={false}
                                withInnerLines={false}
                                withOuterLines={false}
                                renderBar={({ x, y, width, height, index, value }) => (
                                    <rect
                                        key={index}
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill="#FF9500"
                                        rx={4}
                                    />
                                )}
                            // Note: react-native-chart-kit does not have a BarChart with custom renderBar,
                            // so for a true bar chart, you should use BarChart instead of LineChart:
                            // Replace <LineChart ... /> with <BarChart ... /> if available.
                            />
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Text>No category sales data available</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Top 3 Delivery Users</Text>
                        {chartData && chartData.topDeliveryUsers && chartData.topDeliveryUsers.length > 0 ? (
                            <BarChart
                                data={{
                                    labels: chartData.topDeliveryUsers.slice(0, 3).map(item => item.label),
                                    datasets: [
                                        {
                                            data: chartData.topDeliveryUsers.slice(0, 3).map(item => item.value),
                                        },
                                    ],
                                }}
                                width={Dimensions.get('window').width - 48}
                                height={180}
                                yAxisLabel=""
                                yAxisSuffix=""
                                chartConfig={{
                                    backgroundColor: '#f7f7f7',
                                    backgroundGradientFrom: '#f7f7f7',
                                    backgroundGradientTo: '#e0e0e0',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                                    style: {
                                        borderRadius: 8,
                                    },
                                    propsForDots: {
                                        r: '0',
                                    },
                                }}
                                style={{
                                    borderRadius: 8,
                                }}
                                fromZero
                                withDots={false}
                                withShadow={false}
                                withInnerLines={false}
                                withOuterLines={false}
                            />
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Text>No delivery user data available</Text>
                            </View>
                        )}
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 18,
        textAlign: 'center',
    },
    chartCard: {
        backgroundColor: '#f7f7f7',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 2,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartPlaceholder: {
        height: 180,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SalesScreen;