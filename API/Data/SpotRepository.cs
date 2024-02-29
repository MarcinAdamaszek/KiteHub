using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.Entities;
using API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API;

public class SpotRepository : ISpotRepository
{
    private readonly DataContext _context;

    public SpotRepository(DataContext context)
    {
        _context = context;
    }

    public void AddSpot(Spot spot)
    {
        _context.Spots.Add(spot);
    }
    
    public async Task<PagedList<Spot>> GetSpotsAsync(SpotParams spotParams)
    {
        var query = _context.Spots.AsQueryable();

        query = FilterByMonth(query, spotParams.SelectedMonth);

        return await PagedList<Spot>.CreateAsync(query.AsNoTracking(), spotParams.PageNumber,
            spotParams.PageSize);
    }
    public async Task<Spot> GetSpotBySpotNameAsync()
    {
        throw new NotImplementedException();
    }

    private IQueryable<Spot> FilterByMonth(IQueryable<Spot> query, string month)
    {
        var modifiedQuery = month switch
        {
            "january" => query.Where(s => s.January),
            "february" => query.Where(s => s.February),
            "march" => query.Where(s => s.March),
            "april" => query.Where(s => s.April),
            "may" => query.Where(s => s.May),
            "june" => query.Where(s => s.June),
            "july" => query.Where(s => s.July),
            "august" => query.Where(s => s.August),
            "september" => query.Where(s => s.September),
            "october" => query.Where(s => s.October),
            "november" => query.Where(s => s.November),
            "december" => query.Where(s => s.December),
            _ => query
        };

        return modifiedQuery;
    }
}
