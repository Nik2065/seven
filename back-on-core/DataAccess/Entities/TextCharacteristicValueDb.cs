using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    /// <summary>
    /// Таблица для хранение значений текстовых характеристик
    /// 
    /// 
    /// </summary>
    [Table("text_characteristics_values")]
    public class TextCharacteristicValueDb
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int ProductId { get; set; }

        [Required]
        public int CharacteristicId { get; set; }

        [Required]
        public string Value { get; set; }

    }
}
