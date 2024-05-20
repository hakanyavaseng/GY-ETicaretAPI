using ETicaretAPI.Application.Features.Products.Commands.CreateProduct;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.ViewModels.Products;
using ETicaretAPI.Domain.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProductsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    //return Ok(await _productReadRepository.GetAll().ToListAsync());
        //}

        [HttpPost]
        public async Task<IActionResult> Post(CreateProductCommandRequest request)
        {

            await mediator.Send(request);
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
