using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public List<AppUserRole> UserRoles { get; set; }
}
