using System.Collections.Generic;
using System.Threading.Tasks;
using --ProjectName--.--ModuleName--.Exceptions;
using --ProjectName--.--ModuleName--.Interfaces;
using H2OMicroService.Config.Logger.Interfaces;
using H2OMicroService.Ftg.Interfaces;
using H2OMicroService.Ftg.Models;

namespace --ProjectName--.--ModuleName--.Services
{
    public class --ModuleName--Service : I--ModuleName--Service
    {
        private readonly IH2OLogger _logger;
        private readonly I--ModuleName--Repository _--ModuleNameFirstLower--Repository;
        
        public --ModuleName--Service(
            IH2OLogger logger,
            I--ModuleName--Repository --ModuleNameFirstLower--Repository
            )
        {
            _logger = logger;
            _--ModuleNameFirstLower--Repository = --ModuleNameFirstLower--Repository;
        }
		
		//TODO - change model
        public async Task<IList<dynamic>> GetList()
        {
            return await _--ModuleNameFirstLower--Repository.GetList();
        }
    }
}