using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class categoriesDefinition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // categories like 
            migrationBuilder.Sql(@"
            INSERT INTO [dbo].[Categories]
                ([ID]
                ,[Name]
                ,[Description]
                ,[Image]
                ,[SortIndex])
            VALUES
                (NEWID(), 'Bakery & Pastry', '', '', 1),
                (NEWID(), 'Meat & Fish', '', '', 2),
                (NEWID(), 'Fruits & Vegetables', '', '', 3),
                (NEWID(), 'Dairy & Eggs', '', '', 4),
                (NEWID(), 'Deli & Ready Meals', '', '', 5),
                (NEWID(), 'Plant-based Products', '', '', 6),
                (NEWID(), 'Frozen & Ice Cream', '', '', 7),
                (NEWID(), 'Beverages', '', '', 8),
                (NEWID(), 'Groceries', '', '', 9),
                (NEWID(), 'Sweets & Breakfast', '', '', 10),
                (NEWID(), 'Dietary, ECO & International', '', '', 11),
                (NEWID(), 'Cosmetics', '', '', 12),
                (NEWID(), 'Mom & Baby', '', '', 13),
                (NEWID(), 'Detergents & Hygiene', '', '', 14),
                (NEWID(), 'Home & Leisure', '', '', 15),
                (NEWID(), 'Pet Shop', '', '', 16);
               ");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
