using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace MainApi.Auth
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
