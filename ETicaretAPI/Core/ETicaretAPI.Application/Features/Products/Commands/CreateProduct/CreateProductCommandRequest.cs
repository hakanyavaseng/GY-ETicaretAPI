using MediatR;

namespace ETicaretAPI.Application.Features.Products.Commands.CreateProduct
{
    public record CreateProductCommandRequest : IRequest<Unit>
    {
        public string Name { get; set; }
        public int Stock { get; set; }
        public float Price { get; set; }
    }
}
