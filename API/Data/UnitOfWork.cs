﻿using API.Interfaces;
using AutoMapper;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UnitOfWork(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public ISpotRepository SpotRepository => new SpotRepository(_context, 
        _mapper);
    public IRateRepository RateRepository => new RateRepository(_context);
    public IReviewRepository ReviewRepository => new ReviewRepository(_context, _mapper);
    public ICountryRepository CountryRepository => new CountryRepository(_context);
    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }
}
