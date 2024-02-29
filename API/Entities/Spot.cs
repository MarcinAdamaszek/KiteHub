namespace API.Entities;

public class Spot
{
    public int Id { get; set; }
    public string SpotName { get; set; } = "Unnamed Spot";
    public string Description { get; set; } = string.Empty;
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
