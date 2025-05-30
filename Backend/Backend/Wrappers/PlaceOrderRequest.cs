namespace Backend.Wrappers
{
    public class PlaceOrderRequest
    {
        public List<OrderItemData> Cart { get; set; }
        public OrderAddressData AddressData { get; set; }
    }

    public class OrderAddressData
    {
        public string Address { get; set; }
    }

    public class OrderItemData
    {
        public Guid ID { get; set; } // product ID
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
