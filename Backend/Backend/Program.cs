
using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
var appSettingsSection = builder.Configuration.GetSection("ApiOptions");
var appSettings = appSettingsSection.Get<ApiOptions>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);
builder.Services.Configure<ApiOptions>(appSettingsSection);
//Configure JWT Token Authentication
var tokenValidationParameter = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    //Same Secret key will be used while creating the token
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
    RequireExpirationTime = true,
    ValidateLifetime = true,
    // set clock skew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
    ClockSkew = TimeSpan.Zero
};
builder.Services.AddSingleton(tokenValidationParameter);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(token =>
    {
        token.RequireHttpsMetadata = false;
        token.SaveToken = true;
        token.TokenValidationParameters = tokenValidationParameter;
    });
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
/// add dbcontext


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
