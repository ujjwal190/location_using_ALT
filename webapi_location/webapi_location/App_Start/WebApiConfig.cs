using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace webapi_location
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
  name: "ControllersApi",
   routeTemplate: "api/{controller}/{action}/{id}",
      defaults: new { id = RouteParameter.Optional }
);
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // This next commented out line was causing the problem
            //var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

            // This next line was the solution
            var jsonFormatter = config.Formatters.JsonFormatter;
            jsonFormatter.UseDataContractJsonSerializer = false; // defaults to false, but no harm done
            jsonFormatter.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            jsonFormatter.SerializerSettings.Formatting = Formatting.None;
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
