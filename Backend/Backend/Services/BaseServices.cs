using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class BaseServices : IDisposable
    {
        protected readonly ApplicationDbContext Context;

        public BaseServices(ApplicationDbContext context)
        {
            Context = context;
        }

        public void Dispose()
        {
            Context?.Dispose();

        }
    }
}
