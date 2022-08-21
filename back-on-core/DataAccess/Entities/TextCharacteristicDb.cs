using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    /// <summary>
    /// Таблица для хранение текстовых признаков
    /// т.е. кроме основных признаков в товары можно будет добавлять свои текстовые характеристики
    /// 
    /// </summary>
    [Table("text_characteristics")]
    public class TextCharacteristicDb
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string СName { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }


        public Guid AccountId { get; set; }

        public DateTime Created { get; set; }
    }
}
