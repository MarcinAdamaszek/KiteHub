namespace API.Entities;

public class Review
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime DatePosted { get; set; }
    public int AuthorId { get; set; }
    public string AuthorName { get; set; }
    public AppUser Author { get; set; }
    public int SpotReviewedId { get; set; }
    public Spot SpotReviewed { get; set; }
    public bool IsApproved { get; set; }
}
