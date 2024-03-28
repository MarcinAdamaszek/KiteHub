using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public List<Spot> Spots { get; set; }  = new();
    public List<Review> Reviews { get; set; }  = new();
    public List<Rate> Rates { get; set; }  = new();
    public List<AppUserRole> UserRoles { get; set; }
}
