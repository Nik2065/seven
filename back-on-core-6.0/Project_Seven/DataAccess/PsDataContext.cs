using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MySqlConnector;
using System.Data;
using System.Data.Common;

namespace DataAccess
{
    public class PsDataContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "server=localhost;user=newuser;password=123456;database=projectseven;";
            optionsBuilder.UseMySql(connectionString,
                new MySqlServerVersion(new Version(8, 0, 25)));
        }


        public DbSet<SessionCartDb> SessionCarts { get; set; }

        public DbSet<SessionDb> Sessions { get; set; }

        public DbSet<ProductDb> Products { get; set; }
        public DbSet<OrderDb> Orders { get; set; }
        public DbSet<ProjectDb> Projects { get; set; }
        public DbSet<AccountDb> Accounts { get; set; }

        //public DbSet<PartForHeaderDb> PartForHeader { get; set; }

        public DbSet<TextCharacteristicDb> TextCharacteristics { get; set; }

        public DbSet<CategoryDb> Categories { get; set; }

        public DbSet<TextCharacteristicValueDb> TextCharacteristicValues { get; set; }



        //настройки компонентов:
        public DbSet<ProjectPageComponent> ProjectPageComponents { get; set; }

        public DbSet<ComponentSettingsForHeaderDb> ComponentSettingsForHeader { get; set; }

        public DbSet<ComponentSettingsForCarouselDb> ComponentSettingsForCarousel { get; set; }

        public DbSet<CarouselImageDb> CarouselImages { get; set; }

        public DbSet<ComponentSettingsForMenuDb> ComponentSettingsForMenuDb { get; set; }



    }
}

