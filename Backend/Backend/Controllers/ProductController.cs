using Backend.Data;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class ProductController: BaseController
    {
        private readonly IProductServices _productServices;
        public ProductController(ApplicationDbContext context)
        {
            _productServices = new ProductServices(context);
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _productServices.GetAllProducts();
            return Ok(products);
        }

        [HttpGet]
        public IActionResult GetProductsByCategory(Guid categoryID)
        {
            var products = _productServices.GetProductsByCategoryID(categoryID);
            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }
            return Ok(products);
        }

        [HttpGet]
        public IActionResult GetProductByID(Guid id)
        {
            var product = _productServices.GetProductByID(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            return Ok(product);
        }

    }
}
