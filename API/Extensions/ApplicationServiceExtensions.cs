using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{

    private static bool _servicesConfigured = false;
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

                if (!_servicesConfigured) 
                {
                    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
                    _servicesConfigured = true;
                }

                services.AddScoped<IUnitOfWork, UnitOfWork>();
                services.AddScoped<ISpotRepository, SpotRepository>();

                

        return services;
    }
}
