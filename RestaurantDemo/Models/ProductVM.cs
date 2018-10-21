﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantDemo.Models
{
    public class ProductVM
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductDescription { get; set; }
    }
}