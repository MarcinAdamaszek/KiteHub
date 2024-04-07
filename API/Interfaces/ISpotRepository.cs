using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ISpotRepository
{
    void AddSpot(Spot spot);
    Task<PagedList<SpotDto>> GetSpotsAsync(SpotParams spotParams);
    Task<Spot> GetSpotAsync(int spotId);
    void UpdateSpot(Spot spot);
}
