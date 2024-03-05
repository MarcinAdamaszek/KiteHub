using API;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<DataContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        options.ConfigureWarnings(warnings =>
        warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored));
    });


builder.Services.AddScoped<ISpotRepository, SpotRepository>();
builder.Services.AddCors();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(builder => builder.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("https://localhost:4200"));

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try 
{
    var context = services.GetRequiredService<DataContext>();
    var uow = new UnitOfWork(context);
    await context.Database.MigrateAsync();
    await Seed.SeedSpots(uow, context);
}
catch (Exception ex) 
{
    var logger = services.GetService<ILogger<Program>>();

    logger?.LogError(ex, "An Exception occured during migration");
}

app.Run();
