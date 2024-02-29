using API.Entities;
using API.Extensions;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class SpotsController : BaseApiController
{
    private readonly ISpotRepository _spotRepository;

    public SpotsController(ISpotRepository spotRepository)
    {
        _spotRepository = spotRepository;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Spot>>> GetSpots([FromQuery]SpotParams spotParams)
    {
        var months = new string[] {"january", "february", "march", "april", "may", 
            "june", "july", "august", "september", "october", "november", "december"};
        
        if (spotParams.SelectedMonth != "none" && 
            !months.Contains(spotParams.SelectedMonth))
        {
            return BadRequest("Incorrect month name");
        }

        var spots = await _spotRepository.GetSpotsAsync(spotParams);

        Response.AddPaginationHeader(new PaginationHeader(spots.CurrentPage, spots.PageSize, 
        spots.TotalCount, spots.TotalPages));

        return Ok(spots);
    }
}
