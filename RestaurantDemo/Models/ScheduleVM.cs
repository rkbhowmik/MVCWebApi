using System;

namespace RestaurantDemo.Models
{
    public class ScheduleVM
    {
        public int Id { get; set; }
        public string Day { get; set; }
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }
    }
}