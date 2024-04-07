

using API.Entities;

namespace API.Interfaces;

public interface ICountryRepository
{
    void AddCountry(Country country);
    Task<List<string>> GetCountriesAsync();
    Task<Country> GetCountryAsync(string countryName);
}
