using Common;
using Common.DTO;
using DataAccess;
using DataAccess.Entities;
using MainApi.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
//using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        public AuthController()
        {
            _logger = NLog.LogManager.GetCurrentClassLogger();
            _db = new PsDataContext();
        }

        private NLog.Logger _logger;
        private PsDataContext _db;


        [HttpPost]
        [Route("[action]")]
        public IActionResult Token(TokenRequest request)
        {
            //todo: валидация запроса

            var identity = GetIdentity(request.Username, request.Password);
            if (identity == null)
            {
                return Unauthorized(new 
                { 
                    Success = false,
                    Message = "Invalid username or password." }
                );
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                Success = true,
                Message = "Auth success",
                access_token = encodedJwt,
                username = identity.Name,
                expires = DateTime.Now.AddMinutes(AuthOptions.LIFETIME).ToString("s")
            };

            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            //Person person = people.FirstOrDefault(x => x.Login == username && x.Password == password);

            var account = _db.Accounts.FirstOrDefault(item => item.Email == email && item.Pwd == password);


            if (account != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, account.Email),
                    new Claim("accountId", account.Id.ToString())

                    //,new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                ClaimsIdentity claimsIdentity =
                //new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                //    ClaimsIdentity.DefaultRoleClaimType, ClaimTypes.Expired);

                new ClaimsIdentity(claims, "Token");
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }



        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> CreateNewAccount(CreateNewAccountRequest request)
        {
            var result = new BaseResponse { Success=true, Message="Аккаунт успешно создан" };

            try
            {
                //todo: валидация данных


                var a = new AccountDb();
                a.AccountName = request.AccountName;
                a.Id = Guid.NewGuid();
                a.Created = DateTime.Now;


                _db.Accounts.Add(a);
                await _db.SaveChangesAsync();

            }
            catch(Exception ex)
            {
                _logger.Error(ex);

                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }
    }
}
