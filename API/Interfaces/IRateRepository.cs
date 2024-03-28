using API.Entities;

namespace API.Interfaces;

public interface IRateRepository
{
    void AddRate(Rate rate);
    void DeleteRate(Rate rate);
    Task<List<Rate>> GetRatesForSpotAsync(int spotId);
}
