namespace API.DTOs;

public class SpotDto
{
    public int Id { get; set; }
    public string SpotName { get; set; } = "Unnamed Spot";
    public string Country { get; set; } = "Unknown";
    public string Continent { get; set; } = "Unknown";
    public string Description { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int RatesCount { get; set; }
    public int ReviewsCount { get; set; }
    public DateTime DateCreated { get; set; }
    public bool IsBeginner { get; set; }
    public bool IsIntermediate { get; set; }
    public bool IsAdvanced { get; set; }
    public bool January { get; set; }
    public bool February { get; set; }
    public bool March { get; set; }
    public bool April { get; set; }
    public bool May { get; set; }
    public bool June { get; set; }
    public bool July { get; set; }
    public bool August { get; set; }
    public bool September { get; set; }
    public bool October { get; set; }
    public bool November { get; set; }
    public bool December { get; set; }
}
