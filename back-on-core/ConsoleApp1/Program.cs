using System;
using System.Linq;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Hello World!");
            var da = new DataAccess.PsDataContext();
            //var list = da.SessionCarts.ToList();
            var g = new Guid("167438a6-4e75-4c15-bd5b-0a6610f92212");
            var one = da.Sessions.FirstOrDefault(x => x.SessionId == g.ToString());


        }
    }
}
