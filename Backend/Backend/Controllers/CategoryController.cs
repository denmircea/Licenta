using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class CategoryController: ControllerBase
    {
        private readonly ICategoryServices _categoryServices;
        public CategoryController(ICategoryServices categoryServices)
        {
            _categoryServices = categoryServices;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _categoryServices.GetAllCategories();
            if (categories == null || !categories.Any())
            {
                return NotFound("No categories found.");
            }
            return Ok(categories);
        }

        [HttpGet]
        public IActionResult GetCategory(Guid id)
        {
            var category = _categoryServices.GetCategoryByID(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }
            return Ok(category);
        }
    }
}
