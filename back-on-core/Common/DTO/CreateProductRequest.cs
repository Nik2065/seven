using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        
        public int MainCategoryId { get; set; }

        //
        // дополнительные характеристики
        //

        //словарь id характеристики /  значение характеристики
        public Dictionary<int, string> CharacteristicsValues { get; set; }


    }
}
