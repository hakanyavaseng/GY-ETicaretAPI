using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Repositories
{
	//In this class, we define the methods that we will use to read data from the database, it implements the IReadRepository interface.
	public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
	{
		private readonly ETicaretAPIDbContext _context;

		public ReadRepository(ETicaretAPIDbContext context)
		{
			_context = context;
		}

		public DbSet<T> Table => _context.Set<T>();

		public IQueryable<T> GetAll(bool tracking = true)
		{
			var query = Table.AsQueryable();
			if (!tracking)
				query = query.AsNoTracking();
			return query;
		}

		public IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true)
		{
			var query = Table.Where(method);
			if (!tracking)
				query = query.AsNoTracking();
			return query;
		}

		public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
		{
			var query = Table.AsQueryable();
			if (!tracking)
				query = query.AsNoTracking();
			return await query.FirstOrDefaultAsync(method);
		}

		public async Task<T> GetByIdAsync(string id,bool tracking = true)
		{
			var query = Table.AsQueryable();
			if (!tracking)
				query = query.AsNoTracking();
			return await query.FirstOrDefaultAsync(data=> data.Id == Guid.Parse(id)); // Since it is IQueryable, we can not use the Find method, so we use the FirstOrDefault method.
		}


	}
}
