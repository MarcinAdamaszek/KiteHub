using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
 public class RegisterDto
{
    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(20, MinimumLength = 8)]
    public string Password { get; set; }
}