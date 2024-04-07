

namespace API.DTOs;

public class SpotDetailsDto : SpotDto
{
    public decimal Latitude { get; set; } = 0;
    public decimal Longitude { get; set; } = 0;
    public string CreatorName { get; set; }
    public List<ReviewDto> Reviews { get; set; }
}
