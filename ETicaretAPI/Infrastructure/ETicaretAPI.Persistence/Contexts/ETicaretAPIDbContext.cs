using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Contexts
{
	public class ETicaretAPIDbContext : DbContext
	{
		public ETicaretAPIDbContext(DbContextOptions options) : base(options) //IoC container will use this constructor to create an instance of the DbContext
		{
			  
		}

		//Every entity has created and updated date properties. This overriding method will automatically set these properties when an entity is added or updated.
		public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
		{
			 var entry = ChangeTracker.Entries<BaseEntity>();

			foreach(var item in entry)
			{
				switch(item.State)
				{
					case EntityState.Added:
						item.Entity.CreatedDate = DateTime.UtcNow;
						break;
					case EntityState.Modified:
						item.Entity.UpdatedDate = DateTime.UtcNow;
						break;
					default:
						break;
				}
				
			}

			return await base.SaveChangesAsync(cancellationToken);
		}

		public DbSet<Product> Products { get; set; }
		public DbSet<Customer> Customers { get; set; }
		public DbSet<Order> Orders { get; set; }

	}
}
