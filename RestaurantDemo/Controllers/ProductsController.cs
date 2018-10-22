using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using RestaurantDemo.Models;

namespace RestaurantDemo.Controllers
{
    public class ProductsController : ApiController
    {
        private RestaurantEntities db = new RestaurantEntities();

        // GET: api/Products
        public IQueryable<Product> GetProducts()
        {
            return db.Products;
        }

        [Route("api/Products/GetProductsList")]
        public List<ProductVM> GetProductsList()
        {
            try
            {
                using (var _context = new RestaurantEntities())
                {
                    string dataList = "[GetProductList]";
                    var list = _context.Database.SqlQuery<ProductVM>(dataList).ToList<ProductVM>();
                    return list.ToList();
                }
            }
            catch (Exception exception)
            {
                // Try checking if the connection failed here
                throw exception;
            }
        }

        // Returns categories list
        [Route("api/Products/GetCategories")]
        public List<CategoryVM> GetCategories()
        {
            var list = db.Categories.Select(a => new CategoryVM(){CategoryId = a.CategoryId, CategoryName = a.CategoryName }).ToList();
            return list;
        }

        // [ResponseType()] attribute is helpful for creating RESTful Web API
        // GET: api/Products/5
        [ResponseType(typeof(ProductVM))]
        public IHttpActionResult GetProduct(int id)
        {
            var list = db.Products.
                Where(x => x.ProductId == id).
                Select(a => new ProductVM(){
                    CategoryId = a.CategoryId,
                    ProductId = a.ProductId,
                    ProductName = a.ProductName,
                    ProductPrice = a.ProductPrice,
                    ProductDescription = a.ProductDescription
                });

            if (list.Count() == 0)
            {
                return NotFound();
            }
            return Ok(list);
        }

        // PUT method is used to update an existing record in the data source
        // PUT: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductId)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = product.ProductId }, product);
        }

        // POST request is used to create a new record in the data source
        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Products.Add(product);
            db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();
            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductId == id) > 0;
        }
    }
}