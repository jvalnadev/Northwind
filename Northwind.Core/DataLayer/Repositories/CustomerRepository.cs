﻿using System.Data.Entity;
using System.Linq;
using Northwind.Core.DataLayer.Operations;
using Northwind.Core.EntityLayer;

namespace Northwind.Core.DataLayer.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(DbContext dbContext)
            : base(dbContext)
        {
        }

        public override Customer Get(Customer entity)
        {
            return DbSet
                .FirstOrDefault(item => item.CustomerID == entity.CustomerID);
        }
    }
}
