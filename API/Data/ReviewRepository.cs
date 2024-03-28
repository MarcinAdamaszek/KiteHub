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

    public async Task<List<ReviewDto>> GetReviewsForSpotAsync(int spotId)
    {
        return await _context.Reviews
            .Where(r => r.SpotReviewedId == spotId)
            .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
