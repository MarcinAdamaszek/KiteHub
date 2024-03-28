using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
    {
        

                services.AddDbContext<DataContext>(options =>
                {
                    options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                    options.ConfigureWarnings(warnings =>
                        warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored));
                });

                services.AddCors();
                services.AddScoped<ITokenService, TokenService>();
                services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
                services.AddScoped<IUnitOfWork, UnitOfWork>();
        
        return services;
    }
}
