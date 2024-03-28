

namespace API.DTOs;

public class SpotDetailsDto : SpotDto
{
    public string CreatorName { get; set; }
    public List<ReviewDto> Reviews { get; set; }
}
