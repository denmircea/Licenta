using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class adddefaultadmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO [Users] (ID, FirstName, LastName, Email, Password, PhoneNumber, CreatedBy, CreatedOn, ModifiedOn, UserType)
                VALUES (
                    NEWID(),
                    'Admin', 
                    'admin', 
                    'admin',
                    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
                    '123-456-7890', 
                    'System', 
                    GETDATE(),
                    GETDATE(), 
                    2 
                );");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
