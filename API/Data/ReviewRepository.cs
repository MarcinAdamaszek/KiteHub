using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ReviewRepository : IReviewRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ReviewRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void AddReview(Review review)
    {
        _context.Reviews.Add(review);
    }

    public void DeleteReview(Review review)
    {
        _context.Reviews.Remove(review);
    }

    public Task<Review> GetReviewByIdAsync(int reviewId)
    {
        return _context.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);
    }

    public async Task<List<ReviewDto>> GetReviewsForSpotAsync(int spotId, bool approvedOnly = true)
    {
        var query = _context.Reviews.AsQueryable();

        query = query.Where(r => r.SpotReviewedId == spotId);

        if (approvedOnly) query = query.Where(r => r.IsApproved);

        return await query
            .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<List<ReviewDto>> GetUnapprovedReviewsAsync()
    {
        return await _context.Reviews
            .Where(r => r.IsApproved == false)
            .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
