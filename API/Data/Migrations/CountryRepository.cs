
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CountryRepository : ICountryRepository
{
    private readonly DataContext _context;

    public CountryRepository(DataContext context)
    {
        _context = context;
    }

    public void AddCountry(Country country)
    {
        _context.Countries.Add(country);
    }
    public async Task<List<string>> GetCountriesAsync()
    {
        return await _context.Countries.Select(c => c.CountryName).ToListAsync(); 
    }

    public async Task<Country> GetCountryAsync(string countryName)
    {
        return await _context.Countries
            .Where(c => c.CountryName == countryName)
            .SingleOrDefaultAsync();
    }
}
