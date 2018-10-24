using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using webapi_location.Models;

namespace webapi_location.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LocationsController : ApiController
    {
        // GET: api/Locationss
        [HttpGet]
        [Route("api/getlocation")]

        public IEnumerable<object> GetLocations()
        {
            List<Location> locations = new List<Location>();
            LocationDb db = new LocationDb();
            foreach (var loc in db.master_location.ToList())
            {
                Location location = new Location()
                {
                    Id = loc.location_id,
                    Name = loc.location_name
                };
                locations.Add(location);
            }
            return locations;
        }



        // GET: api/UserInformation
        [HttpGet]
        [Route("api/userinformation")]

        public IEnumerable<object> UserInformation()
        {
            List<User> Users = new List<User>();
            LocationDb db = new LocationDb();
            foreach (var usr in db.user_information.ToList())
            {
                User User = new User()
                {
                    Id = usr.user_id,
                    Name = usr.user_name
                };
                Users.Add(User);
            }
            return Users;
        }


        


        [HttpGet]
        [Route("api/getuserfavoritelocation/{id}")]

        public List<Location> GetUserFavoriteLocations(String id)
        {
            List<Location> listlocation = new List<Location>();
            using (LocationDb db = new LocationDb())
            {
                foreach (var data in db.sp_UserFavoriteLocation(id).ToList())
                {
                    var location = new Location()
                    {
                        Id = data.location_id,
                        Name = data.location_name,
                    };
                    listlocation.Add(location);
                }
            }
            return listlocation;
        }

        // GET: api/Locationss
        [HttpGet]
        [Route("api/getUser")]

        public IEnumerable<object> GetLocation()
        {
            List<Location> locations = new List<Location>();
            LocationDb db = new LocationDb();
            foreach (var loc in db.master_location.ToList())
            {
                Location location = new Location()
                {
                    Id = loc.location_id,
                    Name = loc.location_name
                };
                locations.Add(location);
            }
            return locations;
        }



        // GET: api/Locations
        [HttpOptions]
        public string Get(int? id = null)
        {
            return "value";
        }

        // POST: api/add

        [Route("api/favoritelocation")]

        [HttpPost]
        public object Post(Location value)
        {
            try
            {
                LocationDb db = new LocationDb();
                FavoriteLocation fav = new FavoriteLocation();
                favorite_location favoritelocation = new favorite_location()
                {
                    location_id = value.Id

                };

                db.favorite_location.Add(favoritelocation);
                db.SaveChanges();
                return HttpStatusCode.OK;
            }
            catch (Exception)
            {
                return HttpStatusCode.InternalServerError;
            }

        }

        // POST: api/addusefavoritelocation

        [Route("api/adduserfavoritelocation")]

        [HttpPost]
        public object AddUserFavoriteLocation(AddUserFavoriteLocation value)
        {
            try
            {
                LocationDb db = new LocationDb();
                AddUserFavoriteLocation fav = new AddUserFavoriteLocation();
                user_favorite userfavorite = new user_favorite()
                {

                    user_id = value.User_Id,
                    location_id = value.Id

                };

                db.user_favorite.Add(userfavorite);
                db.SaveChanges();
                return HttpStatusCode.OK;
            }
            catch (Exception)
            {
                return HttpStatusCode.InternalServerError;
            }

        }






        // PUT: api/Locations/5

        public void Put(int id, [FromBody] string value)
        {
        }


        [Route("~/api/DeleteFavorite/{id}/{userid}")]
        [HttpGet]
        public IEnumerable<object> Delete(int id , string userid)
        {
            
           
            try
            {
                using (LocationDb db = new LocationDb())
                {
             
                    var uId= Convert.ToInt32(userid);

                    var fav = db.user_favorite.Where(favorite => favorite.location_id == id && favorite.user_id== uId).FirstOrDefault();
                    
                    if (fav != null)
                    {
                        db.user_favorite.Remove(fav);
                        db.SaveChanges();
                    }

                    return null;
                }



            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
