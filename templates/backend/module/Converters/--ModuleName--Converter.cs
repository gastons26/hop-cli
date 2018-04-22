using System.Collections.Generic;
using --ProjectName--.--ModuleName--.Interfaces;
using H2OMicroService.Config.Logger.Interfaces;
using H2OMicroService.Ftg.Interfaces;

namespace --ProjectName--.--ModuleName--.Converters
{
    public class --ModuleName--Converter : I--ModuleName--Converter
    {
        private readonly IConverterFunctionsService _converterFunctionsService;
        private readonly IH2OLogger _logger;

        public --ModuleName--Converter(IConverterFunctionsService converterFunctionsService,
            IH2OLogger logger)
        {
            _converterFunctionsService = converterFunctionsService;
            _logger = logger;
        }

        public IList<dynamic> ConvertJsonToList(string json)
        {
            //TODO - make dynamic to current model
			//TODO - convert rows or make another manipulations with data
            var result = new List<dynamic>();

            var rows = _converterFunctionsService.GetCollectionRows(json);
            if (rows == null) return result;

            foreach (var row in rows)
            {
            }

            return result;
        }
    }
}
