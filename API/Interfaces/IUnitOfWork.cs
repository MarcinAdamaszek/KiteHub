namespace API.Interfaces;

public interface IUnitOfWork
{
    ISpotRepository SpotRepository {get;}
    IRateRepository RateRepository {get;}
    IReviewRepository ReviewRepository {get;}
    Task<bool> Complete();
    bool HasChanges();
}

