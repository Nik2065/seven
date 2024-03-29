﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("carousel_images")]
    public class CarouselImageDb
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public DateTime Created { get; set; }

        public int OrderNom { get; set; }
        public int ComponentId { get; set; }

        public string Title { get; set; }
        public string SubTitle { get; set; }
    }
}
