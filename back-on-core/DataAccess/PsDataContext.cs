﻿using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DataAccess
{
    public class PsDataContext : DbContext
    {

        /*public PsDataContext()
        {
            Database.EnsureCreated();
        }*/

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //var connectionString = "server=localhost;user=root;password=Fgh12345;database=projectseven;";
            var connectionString = "server=localhost;user=newuser;password=123456;database=projectseven;";
            //var ver = new ServerVersion()

            optionsBuilder.UseMySql(
                    connectionString,
                options => {

                    options.ServerVersion("8.0.29");

                    /*options.EnableRetryOnFailure(
                        maxRetryCount: 1,
                        maxRetryDelay: System.TimeSpan.FromSeconds(10),
                        errorNumbersToAdd: null);*/
                }
                );
                
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

