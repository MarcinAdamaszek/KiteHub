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

        var reviews = await _uow.ReviewRepository.GetReviewsForSpotAsync(addReviewDto.SpotReviewedId, false);
        
        if (reviews.Any(r => r.AuthorName == user.UserName)) 
            return BadRequest("You have already reviewed the spot");

        spotReviewed.ReviewsCount++;

        var review = new Review
        {
            Content = addReviewDto.Content,
            DatePosted = DateTime.UtcNow,
            Author = user,
            AuthorName = user.UserName,
            SpotReviewed = spotReviewed,
            IsApproved = false
        };

        _uow.ReviewRepository.AddReview(review);

        if (await _uow.Complete()) return Ok(_mapper.Map<ReviewDto>(review));

        return BadRequest("Failed to rate spot");
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("unapproved")]
    public async Task<ActionResult<List<ReviewDto>>> GetUnapprovedReviews()
    {
        var reviews = await _uow.ReviewRepository.GetUnapprovedReviewsAsync();

        return Ok(_mapper.Map<List<ReviewDto>>(reviews));
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{reviewId}")]
    public async Task<ActionResult> DeleteReview(int reviewId)
    {
        var review = await _uow.ReviewRepository.GetReviewByIdAsync(reviewId);

        if (review == null) return NotFound();

        _uow.ReviewRepository.DeleteReview(review);

        if (!await _uow.Complete()) return BadRequest("Failed to delete review");

        return NoContent();
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut("approve/{reviewId}")]
    public async Task<ActionResult<ReviewDto>> ApproveReview(int reviewId)
    {
        var review = await _uow.ReviewRepository.GetReviewByIdAsync(reviewId);

        if (review == null) return NotFound();

        review.IsApproved = true;

        if (!await _uow.Complete()) return BadRequest("Failed to delete review");

        return Ok(_mapper.Map<ReviewDto>(review)); 
    }
}
