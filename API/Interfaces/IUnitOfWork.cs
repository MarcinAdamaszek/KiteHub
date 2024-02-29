namespace API.Interfaces;

public interface IUnitOfWork
{
    ISpotRepository SpotRepository {get;}
    Task<bool> Complete();
    bool HasChanges();
}

