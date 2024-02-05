using ETicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Repositories
{       
	//In this interface, we define the methods that we will use to read data from the database.
	public interface IReadRepository<T> : IRepository<T> where T : BaseEntity
	{
		//In IQueryable, the data is not retrieved from the database until the data is requested. However, when we use IEnumerable, the data is retrieved from the database immediately and processed in memory.
		IQueryable<T> GetAll();
		IQueryable<T> GetWhere(Expression<Func<T,bool>> method);
		Task<T> GetSingleAsync(Expression<Func<T,bool>> method);
		Task<T> GetByIdAsync(string id);
	}
}
