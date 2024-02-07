using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
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

		readonly private IOrderWriteRepository _orderWriteRepository;
		readonly private IOrderReadRepository _orderReadRepository;

		readonly private ICustomerWriteRepository _customerWriteRepository;

		public ProductsController(IProductWriteRepository productWriteRepository, IProductReadRepository productReadRepository, IOrderWriteRepository orderWriteRepository, ICustomerWriteRepository customerWriteRepository, IOrderReadRepository orderReadRepository)
		{
			_productWriteRepository = productWriteRepository;
			_productReadRepository = productReadRepository;
			_orderWriteRepository = orderWriteRepository;
			_customerWriteRepository = customerWriteRepository;
			_orderReadRepository = orderReadRepository;
		}

		[HttpGet]
		public async Task Get()
		{
			Order order = await _orderReadRepository.GetByIdAsync("788be657-69c5-4652-8d0f-b1aab7acdcfb");
			order.Description = "Updated Description";
			await _orderWriteRepository.SaveAsync();
			
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
