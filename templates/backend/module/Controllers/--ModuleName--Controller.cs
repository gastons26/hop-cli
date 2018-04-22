using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using --ProjectName--.App;
using --ProjectName--.--ModuleName--.i18n;
using --ProjectName--.--ModuleName--.Interfaces;
using H2OMicroService.App;
using H2OMicroService.Components.Attributes;
using H2OMicroService.Components.Exceptions;
using H2OMicroService.Config.Logger.Interfaces;
using Swashbuckle.Swagger.Annotations;
using TRex.Metadata;

namespace --ProjectName--.--ModuleName--.Controllers
{
    [RoutePrefix("api/---microserviceNameLower--/--ModuleNameDashed--")]
    [Authorize]
    [H2OModule(H2OModules.NeedToSetModule)]

    public class --ModuleName--Controller : H2OMicroServiceApiController
    {
        private readonly I--ModuleName--Service _--ModuleNameFirstLower--Service;
        private readonly IH2OLogger _logger;

        public --ModuleName--Controller(I--ModuleName--Service --ModuleNameFirstLower--Service, IH2OLogger logger)
        {
            _--ModuleNameFirstLower--Service = --ModuleNameFirstLower--Service;
            _logger = logger;
        }

        [HttpGet]
        [Route("")]
        [SwaggerResponse(HttpStatusCode.OK, "--ModuleName--", typeof(IList<dynamic>))]
        [Metadata("--ModuleName--", "Return --ModuleName-- list")]
        public async Task<IHttpActionResult> GetList()
        {
            try
            {
                return Ok(await _--ModuleNameFirstLower--Service.GetList());
            }
            catch (H2ORestAuthenticationException ex)
            {
                _logger.DataIntegration().Info(ex.Message, ex);
                return Unauthorized();
            }
            catch (Exception e)
            {
                _logger.App().Error(e.Message, e);
                return BadRequest(Res--ModuleName--.FailedToGetList);
            }
        }
    }
}
