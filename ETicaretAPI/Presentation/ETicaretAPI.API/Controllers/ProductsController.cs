using ETicaretAPI.Application.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductsController : ControllerBase
	{
		readonly private IProductWriteRepository _productWriteRepository;
		readonly private IProductReadRepository _productReadRepository;
		public ProductsController(IProductWriteRepository productWriteRepository, IProductReadRepository productReadRepository)
		{
			_productWriteRepository = productWriteRepository;
			_productReadRepository = productReadRepository;
		}

		[HttpGet]
		public async Task Get()
		{
			await _productWriteRepository.AddRangeAsync(new()
			{
				new() { Name = "Product 1", Price = 100, Stock = 10, CreatedDate = DateTime.UtcNow},
				new() { Name = "Product 2", Price = 200, Stock = 20, CreatedDate = DateTime.UtcNow},
				new() { Name = "Product 3", Price = 300 , Stock = 30, CreatedDate = DateTime.UtcNow},
				new() { Name = "Product 4", Price = 400 , Stock = 40, CreatedDate = DateTime.UtcNow},
				new() { Name = "Product 5", Price = 500 , Stock = 50, CreatedDate = DateTime.UtcNow},
			});

			var count = await _productWriteRepository.SaveAsync();
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			var product = await _productReadRepository.GetByIdAsync(id);
			if (product == null)
				return NotFound();
			return Ok(product);
		}
	}
}
