namespace API.Entities;

public class Rate
{
    public int Id { get; set; }
    public int Score { get; set; }
    public DateTime DateRated { get; set; }
    public int AuthorId { get; set; }
    public AppUser Author { get; set; }
    public int SpotRatedId { get; set; }
    public Spot SpotRated { get; set; }
}
