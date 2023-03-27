using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAccountCharacteristicsResponse : BaseResponse
    {
        public GetAccountCharacteristicsResponse()
        {
            Characteristics = new List<TextCharacteristicDb>();
        }


        public List<TextCharacteristicDb> Characteristics { get; set; }

    }
}
