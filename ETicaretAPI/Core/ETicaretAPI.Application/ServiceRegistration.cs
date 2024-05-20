using ETicaretAPI.Application.Behaviors;
using ETicaretAPI.Application.Exceptions.OnionAPI.Application.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ETicaretAPI.Application
{
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<ExceptionMiddleware>(); //Adding global exception handler middleware to IoC

            ConfigureMediatR(services);
            ConfigureFluentValidation(services);
        }


        public static void ConfigureMediatR(this IServiceCollection services)
        {
            services.AddMediatR(configuration =>
            {
                configuration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            });
        }
        public static void ConfigureFluentValidation(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(FluentValidationBehaviour<,>)); // Fluent validation pipeline behaviour.
        }
    }
}
