using Backend.Data;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class CategoryController: BaseController
    {
        private readonly ICategoryServices _categoryServices;
        public CategoryController(ApplicationDbContext context)
        {
            _categoryServices = new CategoryServices(context);
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
