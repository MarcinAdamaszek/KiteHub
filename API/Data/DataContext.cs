using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>,
    AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
            
    }
    public DbSet<Spot> Spots { get; set; }
    public DbSet<Rate> Rates { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Country> Countries { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();
        
        builder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(ur => ur.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();
        
        builder.Entity<AppUser>()
            .HasMany(ur => ur.Spots)
            .WithOne(s => s.Creator)
            .HasForeignKey(s => s.CreatorId)
            .OnDelete(DeleteBehavior.SetNull);
        
        builder.Entity<AppUser>()
            .HasMany(ur => ur.Reviews)
            .WithOne(rv => rv.Author)
            .HasForeignKey(s => s.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<AppUser>()
            .HasMany(ur => ur.Rates)
            .WithOne(rt => rt.Author)
            .HasForeignKey(s => s.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Spot>()
            .HasMany(s => s.Reviews)
            .WithOne(rv => rv.SpotReviewed)
            .HasForeignKey(rv => rv.SpotReviewedId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<Spot>()
            .HasMany(s => s.Rates)
            .WithOne(rv => rv.SpotRated)
            .HasForeignKey(rv => rv.SpotRatedId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<Spot>()
            .Property(e => e.CreatorId)
            .IsRequired(false);

        builder.Entity<Spot>()
            .Property(s => s.Latitude)
            .HasColumnType("decimal(10, 7)");

        builder.Entity<Spot>()
            .Property(s => s.Longitude)
            .HasColumnType("decimal(10, 7)");
    }
    
}
