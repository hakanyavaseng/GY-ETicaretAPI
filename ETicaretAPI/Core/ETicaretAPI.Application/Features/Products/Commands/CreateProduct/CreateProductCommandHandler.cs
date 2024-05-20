using ETicaretAPI.Application.Interfaces;
using ETicaretAPI.Application.Interfaces.UnitOfWorks;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using MediatR;

namespace ETicaretAPI.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, Unit>
    {

        private readonly IUnitOfWork unitOfWork;
        public CreateProductCommandHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {
            await unitOfWork.GetWriteRepository<Product>().AddAsync(new Product()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Stock = request.Stock,
                Price = request.Price,
            });

            await unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
