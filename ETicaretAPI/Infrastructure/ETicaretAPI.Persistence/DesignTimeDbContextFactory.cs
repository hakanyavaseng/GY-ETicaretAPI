using ETicaretAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;


namespace ETicaretAPI.Persistence
{
	//This class is used to create an instance of the DbContext at design time, especially when we are using the dotnet ef migrations add command
	public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ETicaretAPIDbContext>
	{
		public ETicaretAPIDbContext CreateDbContext(string[] args)
		{

			//Options
			DbContextOptionsBuilder<ETicaretAPIDbContext> dbContextOptionsBuilder = new();
			dbContextOptionsBuilder.UseNpgsql(Configuration.ConnectionString);
			return new ETicaretAPIDbContext(dbContextOptionsBuilder.Options);
		}



	}



}

