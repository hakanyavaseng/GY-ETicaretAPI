using ETicaretAPI.Application;
using ETicaretAPI.Application.Exceptions.OnionAPI.Application.Exceptions;
using ETicaretAPI.Persistence;

var builder = WebApplication.CreateBuilder(args);


//CORS
builder.Services.AddCors(opt =>
{
	opt.AddDefaultPolicy(policy =>
	{
		policy
		.WithOrigins("http://localhost:4200", "http://localhost:4200")
		.AllowAnyHeader()
		.AllowAnyMethod();
		
    });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

//Adding layers
builder.Services.AddPersistenceServices();
builder.Services.AddApplicationServices();

builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
