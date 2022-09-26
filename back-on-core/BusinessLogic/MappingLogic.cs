using Common.DTO.Projects;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic
{
    public class MappingLogic
    {
        public HeaderComponent MapComponentBaseToHeader(ComponentBase componentBase)
        {
            var result = new HeaderComponent();

            result.ComponentOrder = componentBase.ComponentOrder;
            result.ComponentId = componentBase.ComponentId;
            result.ComponentGroupId = componentBase.ComponentGroupId;
            result.Visible = componentBase.Visible;

            return result;
        }

        public T MapComponentBaseToT<T>(ComponentBase componentBase) where T : ComponentBase, new()
        {
            var result = new T
            {
                ComponentOrder = componentBase.ComponentOrder,
                ComponentId = componentBase.ComponentId,
                ComponentGroupId = componentBase.ComponentGroupId,
                Visible = componentBase.Visible
            };

            return result;
        }


    }
}
