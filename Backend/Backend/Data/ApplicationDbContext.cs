using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor: This is where the DbContextOptions are passed in
        // by the ASP.NET Core DI container.
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet properties:
        // These properties represent the collections of entities that can be queried from
        // the database. Each DbSet will typically map to a table in your database.
        // The type parameter (e.g., <User>) is your entity model.
        public DbSet<User> Users { get; set; } = default!; // 'default!' silences nullable warning

        // Add more DbSet properties for any other entities/tables you have:
        // public DbSet<Product> Products { get; set; } = default!;
        // public DbSet<Order> Orders { get; set; } = default!;


        // OnModelCreating method:
        // This method is used for advanced configuration of your EF Core model.
        // You can use it to:
        // - Configure table names, column names, and data types
        // - Define relationships between entities (one-to-many, many-to-many)
        // - Apply constraints (e.g., unique indices)
        // - Seed initial data into the database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // --- Examples of common configurations within OnModelCreating ---

            // 1. Configure a table name if it's different from the DbSet name (e.g., "Users" to "AppUsers")
            // modelBuilder.Entity<User>().ToTable("AppUsers");

            // 2. Configure a primary key (often implicit if named 'Id' or 'ClassNameId')
            // modelBuilder.Entity<User>().HasKey(u => u.Id);

            // 3. Configure a property as required (NOT NULL)
            // modelBuilder.Entity<User>().Property(u => u.Name).IsRequired();

            // 4. Configure a property max length
            // modelBuilder.Entity<User>().Property(u => u.Email).HasMaxLength(255);

            // 5. Configure a unique index
            // modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

            // 6. Seed initial data (useful for development or lookup tables)
          
            // IMPORTANT: Call the base implementation at the end.
            // This ensures that default conventions are applied and any configurations
            // from inherited DbContexts (if any) are respected.
            base.OnModelCreating(modelBuilder);
        }
    }
}