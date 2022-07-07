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
            var list = da.CartSessions.ToList();

        }
    }
}
