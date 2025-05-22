using Backend.Data;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Services
{
    public class CategoryServices : BaseServices, ICategoryServices
    {
        public CategoryServices(ApplicationDbContext context) : base(context)
        {
        }
        
        public List<Category> GetAllCategories()
        {
            return Context.Categories.OrderBy(c=> c.SortIndex).ThenBy(c=>c.Name).ToList();
        }

        public Category GetCategoryByID(Guid id)
        {
            return Context.Categories.FirstOrDefault(c => c.ID == id);
        }

    }
}
