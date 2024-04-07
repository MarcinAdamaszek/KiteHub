using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class SpotsController : BaseApiController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;

    public SpotsController(IUnitOfWork uow, IMapper mapper,
        UserManager<AppUser> userManager)
    {
        _uow = uow;
        _mapper = mapper;
        _userManager = userManager;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<SpotDto>> AddSpot(AddSpotDto addSpotDto)
    {
        var user = await _userManager.GetUserAsync(User);

        var country = await _uow.CountryRepository.GetCountryAsync(addSpotDto.Country);

        if (country == null) return BadRequest("Invalid country name");

        var spot = new Spot 
        {
            SpotName = addSpotDto.SpotName,
            Country = addSpotDto.Country,
            Continent = country.Continent,
            Description = addSpotDto.Description,
            CreatorId = user.Id,
            CreatorName = user.UserName,
            Creator = user,
            Rates = new List<Rate>(),
            Reviews = new List<Review>(),
            Rating = 0,
            RatesCount = 0,
            ReviewsCount = 0,
            DateCreated = DateTime.UtcNow,
            IsBeginner = addSpotDto.IsBeginner,
            IsAdvanced = addSpotDto.IsAdvanced,
            January = addSpotDto.January,
            February = addSpotDto.February,
            March = addSpotDto.March,
            April = addSpotDto.April,
            May = addSpotDto.May,
            June = addSpotDto.June,
            July = addSpotDto.July,
            August = addSpotDto.August,
            September = addSpotDto.September,
            October = addSpotDto.October,
            November = addSpotDto.November,
            December = addSpotDto.December,
        };

        _uow.SpotRepository.AddSpot(spot);

        if (await _uow.Complete()) return Ok(_mapper.Map<SpotDto>(spot));

        return BadRequest("Failed to add spot");

    }

    [HttpGet]
    public async Task<ActionResult<PagedList<SpotDto>>> GetSpots([FromQuery]SpotParams spotParams)
    {
        var months = new string[] {"january", "february", "march", "april", "may", 
            "june", "july", "august", "september", "october", "november", "december"};
        
        if (spotParams.SelectedMonth != "none" && 
            !months.Contains(spotParams.SelectedMonth))
        {
            return BadRequest("Incorrect month name");
        }

        var spots = await _uow.SpotRepository.GetSpotsAsync(spotParams);

        Response.AddPaginationHeader(new PaginationHeader(spots.CurrentPage, spots.PageSize, 
        spots.TotalCount, spots.TotalPages));

        return Ok(spots);
    }

    [HttpGet("{spotId}")]
    public async Task<ActionResult<SpotDetailsDto>> GetSpotDetails(int spotId)
    {
        var spot = await _uow.SpotRepository.GetSpotAsync(spotId);

        if (spot == null) return BadRequest("Incorrect spot id");

        var spotDetails = _mapper.Map<SpotDetailsDto>(spot);

        var reviews = await _uow.ReviewRepository.GetReviewsForSpotAsync(spotId);

        if (reviews.Count > 0) spotDetails.Reviews = reviews;

        return Ok(spotDetails);
    }
}
