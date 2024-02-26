using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.data.migrations
{
    /// <inheritdoc />
    public partial class TestMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpotName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsBeginner = table.Column<bool>(type: "bit", nullable: false),
                    IsIntermediate = table.Column<bool>(type: "bit", nullable: false),
                    IsAdvanced = table.Column<bool>(type: "bit", nullable: false),
                    January = table.Column<bool>(type: "bit", nullable: false),
                    February = table.Column<bool>(type: "bit", nullable: false),
                    March = table.Column<bool>(type: "bit", nullable: false),
                    April = table.Column<bool>(type: "bit", nullable: false),
                    May = table.Column<bool>(type: "bit", nullable: false),
                    June = table.Column<bool>(type: "bit", nullable: false),
                    July = table.Column<bool>(type: "bit", nullable: false),
                    August = table.Column<bool>(type: "bit", nullable: false),
                    September = table.Column<bool>(type: "bit", nullable: false),
                    October = table.Column<bool>(type: "bit", nullable: false),
                    November = table.Column<bool>(type: "bit", nullable: false),
                    December = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spots", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spots");
        }
    }
}
