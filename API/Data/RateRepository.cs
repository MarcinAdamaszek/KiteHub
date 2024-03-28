using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class RateRepository : IRateRepository
{
    private readonly DataContext _context;

    public RateRepository(DataContext context)
    {
        _context = context;
    }
    public void AddRate(Rate rate)
    {
        _context.Rates.Add(rate);
    }

    public void DeleteRate(Rate rate)
    {
        _context.Rates.Remove(rate);
    }

    public async Task<List<Rate>> GetRatesForSpotAsync(int spotId)
    {
        return await _context.Rates
            .Where(r => r.SpotRatedId == spotId)
            .ToListAsync();
    }
}
