using ETicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Repositories
{
	//In this interface, we define the methods that we will use to write data to the database. For example, adding, updating, and deleting data.
	public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
	{
		Task<bool> AddAsync(T model);
		Task<bool> AddRangeAsync(List<T> models);
		bool Remove(T model);
		bool RemoveRange(List<T> models);
		Task<bool> RemoveAsync(string id);
		bool Update(T model);
		Task<int> SaveAsync();
	}
}
