using Backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    public class ProductController: ControllerBase
    {
        private readonly IProductServices _productServices;
        public ProductController(IProductServices productServices)
        {
            _productServices = productServices;
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
