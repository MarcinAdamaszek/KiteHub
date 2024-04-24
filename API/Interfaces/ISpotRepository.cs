using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ISpotRepository
{
    void DeleteSpot(Spot spot);
    void AddSpot(Spot spot);
    Task<PagedList<SpotDto>> GetSpotsAsync(SpotParams spotParams, bool approvedOnly = true);
    Task<Spot> GetSpotAsync(int spotId);
}
