using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RatesController : BaseApiController
{
    private readonly IUnitOfWork _uow;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;

    public RatesController(IUnitOfWork uow, UserManager<AppUser> userManager,
        IMapper mapper)
    {
        _uow = uow;
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> AddRate([FromQuery]int score, int spotId)
    {
        var spotRated = await _uow.SpotRepository.GetSpotAsync(spotId);

        if (spotRated == null) return NotFound();

        var user = await _userManager.GetUserAsync(User);
        var rates = await _uow.RateRepository.GetRatesForSpotAsync(spotId);

        bool alreadyRated = rates.Any(r => r.AuthorId == user.Id);
        if (alreadyRated) return BadRequest("You have already rated the spot");

        List<int> ratingScores = rates.Select(r => r.Score).ToList();
        ratingScores.Add(score);
        spotRated.Rating = ratingScores.Average();

        spotRated.RatesCount++;

        var rate = new Rate 
        {
            Score = score,
            DateRated = DateTime.UtcNow,
            Author = user,
            SpotRated = spotRated
        };

        _uow.RateRepository.AddRate(rate);

        if (await _uow.Complete()) return Ok(_mapper.Map<RateDto>(rate));

        return BadRequest("Failed to rate spot");
    }
}