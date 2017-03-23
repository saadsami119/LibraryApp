using app.Server.Core.Repository;
using app.Server.Core.Service;
using app.Server.Infrastructure.Repository;
using app.Server.Infrastructure.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace app.Server
{
    public class Startup
    {
      public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                  .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling
                      = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                  .AddJsonOptions(
                      option => option.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddCors(options =>
                                options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                                    .AllowAnyMethod()
                                                                    .AllowAnyHeader()
                                                                    .WithMethods("POST", "GET")));

            services.AddSingleton<IDatabaseContext, AppDbContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IBookService, BookService>();
            services.AddTransient<IAccountService, AccountService>();   
            services.AddTransient<ICheckoutService, CheckoutService>();

        }
       
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            app.UseDefaultFiles(GetDefaultFileOptions());
            app.UseStaticFiles();
            app.UseCors("AllowAll");
            app.UseMvc();
       
            //var dbContext = app.ApplicationServices.GetRequiredService<IDatabaseContext>();
            //dbContext.CreateDatabase();
        }

        private DefaultFilesOptions GetDefaultFileOptions()
        {
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("app.html");
            return options;
        }
        
    }
}
