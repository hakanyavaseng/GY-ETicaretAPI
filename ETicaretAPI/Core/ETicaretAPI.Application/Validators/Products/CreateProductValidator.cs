using ETicaretAPI.Application.Features.Products.Commands.CreateProduct;
using ETicaretAPI.Application.ViewModels.Products;
using FluentValidation;

namespace ETicaretAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<CreateProductCommandRequest>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                    .WithMessage("Lütfen ürün adını boş geçmeyiniz.")
                .MinimumLength(3)
                    .WithMessage("Ürün adı minimum 3 karakter olabilir.")
                .MaximumLength(256)
                    .WithMessage("Ürün adı maksimum 256 karakter olabilir.");

            RuleFor(p => p.Stock)
                .NotEmpty()
                    .WithMessage("Stok bilgisi boş geçilemez.")
                .Must(s => s >= 0)
                .WithMessage("Stok bilgisi 0'dan büyük olmalıdır.");

            RuleFor(p => p.Price)
                .NotEmpty()
                    .WithMessage("Fiyat bilgisi boş geçilemez.")
                .Must(s => s >= 0)
                .WithMessage("Fiyat bilgisi 0'dan büyük olmalıdır.");
        }
    }
}
