using RestaurantDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RestaurantDemo.Controllers
{
    public class ScheduleController : ApiController
    {
        private RestaurantEntities db = new RestaurantEntities();

        [HttpPost]
        [Route("api/Schedule/CheckSchedule")]
        // Postman call :: http://localhost:54389/api/Schedule/CheckSchedule?id=4&time=20
        public List<ScheduleVM> CheckSchedule(int id, TimeSpan time)
        {
            
            var list = db.Schedules.Where(x => x.Id == id).Select(a => new ScheduleVM()
            {
                Day = a.Day,
                OpeningTime = a.OpeningTime,
                ClosingTime = a.ClosingTime
            }).ToList();

            int openTime = list.FirstOrDefault().OpeningTime.Hours;
            int closeTime = list.FirstOrDefault().ClosingTime.Hours;
            int checkTime = (int)time.TotalDays;

            if ((openTime <= checkTime) &&
                (closeTime >= checkTime))
            {
                return list;
            }
            else
            {
                list = null;
            }

            return list;
        }

        // GET: api/Schedule/5
        public List<ScheduleVM> GetSchedule(int id)
        {
            var list = db.Schedules.Where(x => x.Id == id).Select(a => new ScheduleVM()
            {
                Day = a.Day,
                OpeningTime = a.OpeningTime,
                ClosingTime = a.ClosingTime
            }).ToList();
            return list;
        }
    }
}
