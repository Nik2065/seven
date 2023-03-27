using Common;
using Common.DTO;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
using MainApi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminCategoriesController : Controller
    {
        public AdminCategoriesController()
        {
            _db = new PsDataContext();
        }

        PsDataContext _db;


        /// <summary>
        /// �������� ������ ��������� ��� ��������
        /// ������� ����� �� �����������
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> GetAccounCategories()
        {
            var result = new GetAccounCategoriesResponse { Success = true, Message = "" };

            try
            {
                var aid = Helper.GetAccountId(User.Claims);
                result.Categories = _db.Categories.Where(x => x.AccountId == aid).ToList();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }

        /// <summary>
        /// �������� ����� ��������� ������� ��� �������� 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> CreateCategory(CreateCategoryRequest request)
        {
            var result = new BaseResponse { Success = true, Message = "�������������� �������" };

            try
            {
                //TODO: ��������
                //�� ��������� ������� �������� �������������� � ��� �����������

                if (string.IsNullOrEmpty(request.Name) || request.Name.Length < 3)
                    throw new Exception("������� �������� ��� ���������. ��� ������ ���� ������ 2� ��������");


                var tmp = _db.Categories.FirstOrDefault(x => x.Name == request.Name.Trim());
                if (tmp != null)
                    throw new Exception("��������� � ����� ������ ��� ���� ��������� �����");



                var aid = Helper.GetAccountId(User.Claims);
                var c = new CategoryDb();
                c.Name = request.Name.Trim();
                c.Description = request.Description.Trim();
                c.AccountId = aid;
                c.Created = DateTime.Now;


                _db.Categories.Add(c);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                return BadRequest(result);
            }

            return Ok(result);

        }


        /// <summary>
        /// �������� ��������� ��� �������� 
        /// ��������� ��� ��� ��� �� �������������� ��� �������
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> DeleteCategory(DeleteCategoryRequest request)
        {
            var result = new BaseResponse { Success = true, Message = "��������� �������" };

            try
            {
                var aid = Helper.GetAccountId(User.Claims);
                var one = _db.Categories.FirstOrDefault(item => item.Id == request.CategoryId && item.AccountId == aid);

                if (one == null)
                    throw new Exception("��������� � ����� id �� �������");

                _db.Categories.Remove(one);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                return BadRequest(result);
            }

            return Ok(result);
        }


    }
}
