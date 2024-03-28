using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
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
        var spot = await _uow.SpotRepository.GetSpotDtoAsync(spotId);

        if (spot == null) return BadRequest("Incorrect spot id");

        var spotDetails = _mapper.Map<SpotDetailsDto>(spot);

        var reviews = await _uow.ReviewRepository.GetReviewsForSpotAsync(spotId);

        if (reviews.Count > 0) spotDetails.Reviews = reviews;

        return Ok(spotDetails);
    }
}
