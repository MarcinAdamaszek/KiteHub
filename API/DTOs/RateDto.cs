namespace API.DTOs;

public class RateDto
{
    public int Id { get; set; }
    public int Score { get; set; }
    public DateTime DateRated { get; set; }
    public int AuthorId { get; set; }
    public int SpotRatedId { get; set; }
}
