using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<RegisterDto, AppUser>();
        CreateMap<Spot, SpotDto>();
        CreateMap<Spot, SpotDetailsDto>();
        CreateMap<Rate, RateDto>();
        CreateMap<Review, ReviewDto>();
        CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
        CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue ? 
            DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);
    }
}