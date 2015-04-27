﻿using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Northwind.Core.DataLayer.Contracts;
using Northwind.Core.DataLayer.Operations;
using Northwind.Core.EntityLayer;

namespace Northwind.Core.DataLayer.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(DbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<Order> Get(Int32? orderID)
        {
            return await DbSet
                .Include(p => p.OrderDetails.Select(od => od.FkOrderDetailsProducts))
                .FirstOrDefaultAsync(item => item.OrderID == orderID);
        }

        public IQueryable<OrderSummary> GetSummaries()
        {
            return from order in GetAll()
                   join customer in DbContext.Set<Customer>() on order.CustomerID equals customer.CustomerID
                   join shipper in DbContext.Set<Shipper>() on order.ShipVia equals shipper.ShipperID
                   select new OrderSummary()
                   {
                       OrderID = order.OrderID,
                       OrderDate = order.OrderDate,
                       Lines = order.OrderDetails.Count(),
                       Customer = customer.CompanyName,
                       Shipper = shipper.CompanyName
                   };
        }
    }
}
