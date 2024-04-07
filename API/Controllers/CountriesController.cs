using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

public class CountriesController : BaseApiController
{
    private readonly IUnitOfWork _uow;

    public CountriesController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<string>>> GetCountries()
    {
        var countries = await _uow.CountryRepository.GetCountriesAsync();

        if (countries.IsNullOrEmpty()) return NotFound();

        return Ok(countries);
    }

}
