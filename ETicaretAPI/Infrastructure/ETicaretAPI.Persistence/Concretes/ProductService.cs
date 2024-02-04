using ETicaretAPI.Application.Abstractions;
using ETicaretAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Concretes
{

	public class ProductService : IProductService
	{
		public List<Product> GetProducts()
		 => new()
		 {
			 new Product
			 {
				 Id = Guid.NewGuid(),
				 Name = "Product 1",
				 Stock = 100,
				 Price = 100
			 },
			 new Product
			 {
				 Id = Guid.NewGuid(),
				 Name = "Product 2",
				 Stock = 200,
				 Price = 200
			 },
			 new Product
			 {
				 Id = Guid.NewGuid(),
				 Name = "Product 3",
				 Stock = 300,
				 Price = 300
			 }
		 };
	}
}
