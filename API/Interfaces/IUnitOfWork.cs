namespace API.Interfaces;

public interface IUnitOfWork
{
    ISpotRepository SpotRepository {get;}
    IRateRepository RateRepository {get;}
    IReviewRepository ReviewRepository {get;}
    ICountryRepository CountryRepository {get;}
    Task<bool> Complete();
    bool HasChanges();
}

