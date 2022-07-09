using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Common
{
    /// <summary>
    /// Класс для паджинации любого списка
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ListToPages<T>
    {
        public static GetPageResult<T> GetPage(IQueryable<T> list, int pageSize, int pageNumber)
        {
            var itemsCount = list.Count();

            int pagesCount = 1;
            int currentPageNumber = 1;

            IQueryable<T> resultList;

            if (itemsCount <= pageSize)
            {
                resultList = list;
            }
            else
            {
                var d = (decimal)itemsCount / pageSize;
                pagesCount = (int)Math.Ceiling(d);
                currentPageNumber = (pageNumber > pagesCount) ? pagesCount : pageNumber;

                var skipRecord = (currentPageNumber - 1) * pageSize;

                resultList = list.Skip(skipRecord).Take(pageSize);
            }

            var result = new GetPageResult<T>
            {
                ResultList = resultList,
                PagesCount = pagesCount,
                PageNumber = currentPageNumber,
                HasNextPage = currentPageNumber < pagesCount - 1,
                HasPreviousPage = currentPageNumber > 1,
            };



            return result;
        }


    }

    public class GetPageResult<T>
    {
        public IQueryable<T> ResultList { get; set; }
        public int PagesCount { get; set; }
        public int PageNumber { get; set; }

        public bool HasPreviousPage { get; set; }
        public bool HasNextPage { get; set; }
    }
}


