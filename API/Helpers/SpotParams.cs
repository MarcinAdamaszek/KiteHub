namespace API.Helpers;

public class SpotParams : PaginationParams
{
    public string SelectedMonth { get; set; } = "none";
    public bool IsApproved { get; set; }
}
