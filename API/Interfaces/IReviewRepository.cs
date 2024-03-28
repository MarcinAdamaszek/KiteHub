using API.Entities;

namespace API.Interfaces;

public interface IReviewRepository
{
    void AddReview(Review rate);
    void DeleteReview(Review rate);
    Task<List<ReviewDto>> GetReviewsForSpotAsync(int spotId);
}
