using API;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Middleware;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();

// builder.Services.AddDbContext<DataContext>(options =>
//     {
//         options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//         options.ConfigureWarnings(warnings =>
//         warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored));
//     });


// builder.Services.AddScoped<ISpotRepository, SpotRepository>();
// builder.Services.AddCors();

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);


var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors(builder => builder.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try 
{
    var context = services.GetRequiredService<DataContext>();
    var mapper = services.GetRequiredService<IMapper>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    var uow = new UnitOfWork(context, mapper);
    await context.Database.MigrateAsync();
    await Seed.SeedCountries(uow, context);
    await Seed.SeedUsers(userManager, roleManager);
    await Seed.SeedSpots(uow, context);
}
catch (Exception ex) 
{
    var logger = services.GetService<ILogger<Program>>();

    logger?.LogError(ex, "An Exception occured during migration");
}

app.Run();
