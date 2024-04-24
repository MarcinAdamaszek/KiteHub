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

    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{spotId}")]
    public async Task<ActionResult> DeleteSpot(int spotId)
    {
        var spot = await _uow.SpotRepository.GetSpotAsync(spotId);

        if (spot == null) return NotFound();

        _uow.SpotRepository.DeleteSpot(spot);

        if (!await _uow.Complete()) return BadRequest("Failed to delete the spot");

        return NoContent();
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut("approve/{spotId}")]
    public async Task<ActionResult<Spot>> ApproveSpot(int spotId)
    {
        var spot = await _uow.SpotRepository.GetSpotAsync(spotId);

        if (spot == null) return NotFound();

        spot.IsApproved = true;

        if (!await _uow.Complete()) return BadRequest("Failed to approve the spot");

        return Ok(spot);
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<ActionResult<Spot>> UpdateSpot(SpotManipulationDto updateSpotDto)
    {
        var spot = await _uow.SpotRepository.GetSpotAsync(updateSpotDto.Id);

        if (spot == null) return NotFound();

        spot.SpotName = updateSpotDto.SpotName;
        spot.Latitude = updateSpotDto.Latitude;
        spot.Longitude = updateSpotDto.Longitude;
        spot.Country = updateSpotDto.Country;
        spot.Description = updateSpotDto.Description;
        spot.IsBeginner = updateSpotDto.IsBeginner;
        spot.IsAdvanced = updateSpotDto.IsAdvanced;
        spot.January = updateSpotDto.January;
        spot.February = updateSpotDto.February;
        spot.March = updateSpotDto.March;
        spot.April = updateSpotDto.April;
        spot.May = updateSpotDto.May;
        spot.June = updateSpotDto.June;
        spot.July = updateSpotDto.July;
        spot.August = updateSpotDto.August;
        spot.September = updateSpotDto.September;
        spot.October = updateSpotDto.October;
        spot.November = updateSpotDto.November;
        spot.December = updateSpotDto.December;

        if (!_uow.HasChanges()) return BadRequest("You cannot update the spot without changing any data");

        if (!await _uow.Complete()) return BadRequest("Failed to update the spot");

        return Ok(spot);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<SpotDto>> AddSpot(SpotManipulationDto addSpotDto)
    {
        var user = await _userManager.GetUserAsync(User);

        var country = await _uow.CountryRepository.GetCountryAsync(addSpotDto.Country);

        if (country == null) return BadRequest("Invalid country name");

        var spot = _mapper.Map<Spot>(addSpotDto);
        spot.CreatorId = user.Id;
        spot.CreatorName = user.UserName;
        spot.Creator = user;
        spot.DateCreated = DateTime.UtcNow;
        spot.Continent = country.Continent;

        _uow.SpotRepository.AddSpot(spot);

        if (await _uow.Complete()) return Ok(_mapper.Map<SpotDto>(spot));

        return BadRequest("Failed to add spot");

    }

    [HttpGet("approved")]
    public async Task<ActionResult<PagedList<SpotDto>>> GetApprovedSpots([FromQuery]SpotParams spotParams)
    {
        if (!spotParams.IsMonthCorrect()) return BadRequest("Incorrect month name");

        var spots = await _uow.SpotRepository.GetSpotsAsync(spotParams);

        Response.AddPaginationHeader(new PaginationHeader(spots.CurrentPage, spots.PageSize, 
        spots.TotalCount, spots.TotalPages));

        return Ok(spots);
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<ActionResult<PagedList<SpotDto>>> GetSpots([FromQuery]SpotParams spotParams)
    {

        if (!spotParams.IsMonthCorrect()) return BadRequest("Incorrect month name");

        var spots = await _uow.SpotRepository.GetSpotsAsync(spotParams, false);

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
