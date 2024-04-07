using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ReviewsController : BaseApiController
{
    private readonly IUnitOfWork _uow;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;

    public ReviewsController(IUnitOfWork uow, UserManager<AppUser> userManager,
        IMapper mapper)
    {
        _uow = uow;
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ReviewDto>> AddReview(AddReviewDto addReviewDto)
    {
        var spotReviewed = await _uow.SpotRepository.GetSpotAsync(addReviewDto.SpotReviewedId);

        if (spotReviewed == null) return NotFound();

        var user = await _userManager.GetUserAsync(User);

        var reviews = await _uow.ReviewRepository.GetReviewsForSpotAsync(addReviewDto.SpotReviewedId);
        
        if (reviews.Any(r => r.AuthorName == user.UserName)) 
            return BadRequest("You have already reviewed the spot");

        spotReviewed.ReviewsCount++;

        var review = new Review
        {
            Content = addReviewDto.Content,
            DatePosted = DateTime.UtcNow,
            Author = user,
            AuthorName = user.UserName,
            SpotReviewed = spotReviewed
        };

        _uow.ReviewRepository.AddReview(review);

        if (await _uow.Complete()) return Ok(_mapper.Map<ReviewDto>(review));

        return BadRequest("Failed to rate spot");
    }
}
