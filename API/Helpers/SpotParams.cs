namespace API.Helpers;

public class SpotParams : PaginationParams
{
    public string SelectedMonth { get; set; } = "none";
    public bool IsMonthCorrect()
    {
        var months = new string[] {"january", "february", "march", "april", "may", 
            "june", "july", "august", "september", "october", "november", "december"};
        
        if (SelectedMonth != "none" && 
            !months.Contains(SelectedMonth))
        {
            return false;
        }

        return true;
    }
}
