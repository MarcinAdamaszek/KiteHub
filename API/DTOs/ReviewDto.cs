namespace API;

public class ReviewDto
{
    public int Id {get; set;}
    public string Content { get; set; }
    public string AuthorName { get; set; }
    public DateTime DatePosted { get; set; }
}
