using ETicaretAPI.Application.Features.Products.Commands.CreateProduct;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.RequestParameters;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator mediator;
        IProductReadRepository productReadRepository;
        IProductWriteRepository productWriteRepository;

        public ProductsController(IMediator mediator, IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository)
        {
            this.mediator = mediator;
            this.productReadRepository = productReadRepository;
            this.productWriteRepository = productWriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Pagination pagination)
        {
            var totalCount = await productReadRepository.GetAll(false).CountAsync();
            var products = await productReadRepository.GetAll(false).Select(p => new
            {
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.CreatedDate,
                p.UpdatedDate,
            })
            .Skip(pagination.Page * pagination.Size)
            .Take(pagination.Size)
            .OrderByDescending(p => p.CreatedDate)
            .ToListAsync();

            return Ok(new
            {
                totalCount,
                products
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateProductCommandRequest request)
        {

            await mediator.Send(request);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            await productWriteRepository.RemoveAsync(id);
            await productWriteRepository.SaveAsync();
            return Ok();
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(string id)
        //{
        //    var product = await _productReadRepository.GetByIdAsync(id);
        //    if (product == null)
        //        return NotFound();
        //    return Ok(product);
        //}
    }
}
