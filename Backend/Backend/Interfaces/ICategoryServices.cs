using Backend.Models;

namespace Backend.Interfaces
{
    public interface ICategoryServices
    {
        public List<Category> GetAllCategories();
        public Category GetCategoryByID(Guid id);
    }
}
