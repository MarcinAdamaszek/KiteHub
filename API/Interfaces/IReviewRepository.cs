using API.Entities;

namespace API.Interfaces;

public interface IReviewRepository
{
    void AddReview(Review rate);
    void DeleteReview(Review rate);
    Task<Review> GetReviewByIdAsync(int reviewId);
    Task<List<ReviewDto>> GetReviewsForSpotAsync(int spotId, bool approvedOnly = true);
    Task<List<ReviewDto>> GetUnapprovedReviewsAsync();
}
