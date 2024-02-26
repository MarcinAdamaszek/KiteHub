using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
            
    }
    public DbSet<Spot> Spots { get; set; }
}
