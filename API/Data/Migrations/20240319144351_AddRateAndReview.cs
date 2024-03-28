using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.data.migrations
{
    /// <inheritdoc />
    public partial class AddRateAndReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsIntermediate",
                table: "Spots");

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Spots",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatorName",
                table: "Spots",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RatesCount",
                table: "Spots",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Spots",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "ReviewsCount",
                table: "Spots",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Rates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Score = table.Column<int>(type: "int", nullable: false),
                    DateRated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    SpotRatedId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rates_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rates_Spots_SpotRatedId",
                        column: x => x.SpotRatedId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatePosted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    AuthorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpotReviewedId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Spots_SpotReviewedId",
                        column: x => x.SpotReviewedId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Spots_CreatorId",
                table: "Spots",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Rates_AuthorId",
                table: "Rates",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Rates_SpotRatedId",
                table: "Rates",
                column: "SpotRatedId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AuthorId",
                table: "Reviews",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_SpotReviewedId",
                table: "Reviews",
                column: "SpotReviewedId");

            migrationBuilder.AddForeignKey(
                name: "FK_Spots_AspNetUsers_CreatorId",
                table: "Spots",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spots_AspNetUsers_CreatorId",
                table: "Spots");

            migrationBuilder.DropTable(
                name: "Rates");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Spots_CreatorId",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "CreatorName",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "RatesCount",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "ReviewsCount",
                table: "Spots");

            migrationBuilder.AddColumn<bool>(
                name: "IsIntermediate",
                table: "Spots",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
