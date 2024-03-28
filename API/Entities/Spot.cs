namespace API.Entities;

public class Spot
{
    public int Id { get; set; }
    public string SpotName { get; set; } = "Unnamed Spot";
    public string Description { get; set; } = string.Empty;
    public int? CreatorId { get; set; }
    public string CreatorName { get; set; }  = string.Empty;
    public AppUser Creator { get; set; }
    public List<Rate> Rates { get; set; } = new();
    public List<Review> Reviews { get; set; } = new();
    public double Rating { get; set; } = 0;
    public int RatesCount { get; set; } = 0;
    public int ReviewsCount { get; set; } = 0;
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    public bool IsBeginner { get; set; }
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
