using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

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
        public List<Product> GetAllProducts()
        {
            var result = Context.Products.AsNoTracking().ToList();
            return result;
        }

        public Guid SaveProduct(Product product)
        {
            if(product.ID == Guid.Empty)
            {
                product.ID = new Guid();
                Context.Products.Add(product);
            }
            else
            {
                Context.Products.Update(product);
            }
            try
            {
                Context.SaveChanges();
                return product.ID;
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return Guid.Empty;
            }
        }
    }
}
