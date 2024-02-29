using API.Entities;
using API.Helpers;

namespace API;

public interface ISpotRepository
{
    void AddSpot(Spot spot);
    Task<PagedList<Spot>> GetSpotsAsync(SpotParams spotParams);
    Task<Spot> GetSpotBySpotNameAsync();
}
