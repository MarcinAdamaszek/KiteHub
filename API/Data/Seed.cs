using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text.Json;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{

    public static async Task SeedCountries(UnitOfWork uow, DataContext context)
    {
        if (await context.Countries.AnyAsync()) return;

        var countriesData = await File.ReadAllTextAsync("Data/CountriesData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var countries = JsonSerializer.Deserialize<List<Country>>(countriesData, options);

        if (countries == null) return;
        
        foreach (var country in countries)
        {
            uow.CountryRepository.AddCountry(country);
        }

        await uow.Complete();
    }
    public static async Task SeedUsers(UserManager<AppUser> userManager, 
        RoleManager<AppRole> roleManager) 
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        var roles = new List<AppRole>
        {
            new AppRole{Name = "Member"},
            new AppRole{Name = "Admin"},
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        if (users == null) return; 
        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            if (user.UserName != null) user.UserName = user.UserName.ToLower();

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new AppUser
        {
            UserName = "admin",
            Email = "example@example.com",
            EmailConfirmed = true
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, ["Admin"]);
    }

    public static async Task SeedSpots(IUnitOfWork uow, DataContext context) 
    {
        if (await context.Spots.AnyAsync()) return;

        var spotData = await File.ReadAllTextAsync("Data/SpotSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var spots = JsonSerializer.Deserialize<List<Spot>>(spotData, options);

        if (spots == null) return;
        
        foreach (var spot in spots)
        {
            spot.Latitude = (decimal) -33.9259248;
            spot.Longitude = (decimal) 18.4258142;
            uow.SpotRepository.AddSpot(spot);
        }

        await uow.Complete();
    }
}
