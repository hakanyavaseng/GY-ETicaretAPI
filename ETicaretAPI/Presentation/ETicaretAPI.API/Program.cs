using ETicaretAPI.Persistence;

var builder = WebApplication.CreateBuilder(args);

//Adding layers
builder.Services.AddPersistenceServices();

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

builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
