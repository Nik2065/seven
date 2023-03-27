using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Auth
{
    public static class Helper
    {
        public static Guid GetAccountId(IEnumerable<Claim> userClaims)
        {
            //var claims = User.Claims;
            var aid = userClaims.FirstOrDefault(x => x.Type == "accountId")?.ToString();
            aid = aid?.Replace("accountId:", "");
            aid = aid?.Replace(" ", "");

            return Guid.Parse(aid);
        }
    }
}
