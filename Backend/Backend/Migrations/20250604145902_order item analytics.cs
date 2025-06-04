using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class orderitemanalytics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderItemRelationAnalystics",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Product1ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Product2ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EdgeValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItemRelationAnalystics", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderItemRelationAnalystics_Products_Product1ID",
                        column: x => x.Product1ID,
                        principalTable: "Products",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_OrderItemRelationAnalystics_Products_Product2ID",
                        column: x => x.Product2ID,
                        principalTable: "Products",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemRelationAnalystics_Product1ID",
                table: "OrderItemRelationAnalystics",
                column: "Product1ID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemRelationAnalystics_Product2ID",
                table: "OrderItemRelationAnalystics",
                column: "Product2ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItemRelationAnalystics");
        }
    }
}
