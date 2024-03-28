using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SpotRepository : ISpotRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public SpotRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void AddSpot(Spot spot)
    {
        _context.Spots.Add(spot);
    }
    
    public async Task<PagedList<SpotDto>> GetSpotsAsync(SpotParams spotParams)
    {
        var query = _context.Spots.AsQueryable();

        query = FilterByMonth(query, spotParams.SelectedMonth);

        return await PagedList<SpotDto>.CreateAsync(query.AsNoTracking()
            .ProjectTo<SpotDto>(_mapper.ConfigurationProvider), spotParams.PageNumber,
            spotParams.PageSize);
    }
    public async Task<Spot> GetSpotAsync(int spotId)
    {
        return await _context.Spots
            .Where(s => s.Id == spotId)
            .SingleOrDefaultAsync();
    }

    public async Task<SpotDto> GetSpotDtoAsync(int spotId)
    {
        return await _context.Spots
            .Where(s => s.Id == spotId)
            .ProjectTo<SpotDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }
    public void UpdateSpot(Spot spot)
    {
        _context.Entry(spot).State = EntityState.Modified;
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
