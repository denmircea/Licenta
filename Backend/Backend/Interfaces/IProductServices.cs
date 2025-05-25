using Backend.Models;

namespace Backend.Interfaces
{
    public interface IProductServices
    {
        public Product GetProductByID(Guid id);
        public List<Product> GetProductsByCategoryID(Guid categoryId);
        public List<Product> GetAllProducts();


    }
}
