using System.Text.Json;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedSpots(IUnitOfWork uow, DataContext context) 
    {
        if (await context.Spots.AnyAsync()) return;

        var spotData = await File.ReadAllTextAsync("Data/SpotSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var spots = JsonSerializer.Deserialize<List<Spot>>(spotData, options);

        if (spots == null) return;
        
        foreach (var spot in spots)
        {
            uow.SpotRepository.AddSpot(spot);
        }

        await uow.Complete();
    }
}
