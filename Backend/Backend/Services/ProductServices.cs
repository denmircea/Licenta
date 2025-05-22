using Backend.Data;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Services
{
    public class ProductServices: BaseServices, IProductServices
    {
        public ProductServices(ApplicationDbContext context) : base(context)
        {
        }

        public List<Product> GetProductsByCategoryID(Guid categoryId)
        {
            return Context.Products
                .Where(p => p.CategoryID == categoryId)
                .OrderBy(p => p.Name)
                .ToList();
        }

        public Product GetProductByID(Guid id)
        {
            var result =  Context.Products
                .Where(p => p.ID == id)
                .FirstOrDefault();
            if (result == null)
            {
                throw new Exception("Product not found");
            }
            return result;
        }
    }
}
