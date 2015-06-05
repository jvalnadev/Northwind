﻿using Northwind.Core.DataLayer;
using Northwind.Core.DataLayer.OperationContracts;

namespace NorthwindMvc5.Services
{
    public class UowService : IUowService
    {
        public ISalesUow GetSalesUow()
        {
            return new SalesUow(new SalesDbContext());
        }
    }
}
