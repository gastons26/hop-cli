using System.Collections.Generic;
using System.Threading.Tasks;
using --ProjectName--.--ModuleName--.Exceptions;
using --ProjectName--.--ModuleName--.i18n;
using --ProjectName--.--ModuleName--.Interfaces;
using H2OMicroService.Components.AppFtg.List;
using H2OMicroService.Components.WebClient.Interfaces;
using H2OMicroService.Config.Logger.Interfaces;

namespace --ProjectName--.--ModuleName--.Repositories
{
    public class --ModuleName--Repository : I--ModuleName--Repository
    {
        private readonly IH2OLogger _logger;
        private readonly IH2OWebClientFactory _webClientFactory;
        private readonly I--ModuleName--Converter _converter;

        public --ModuleName--Repository(IH2OLogger logger, IH2OWebClientFactory webClientFactory, I--ModuleName--Converter converter)
        {

            _logger = logger;
            _webClientFactory = webClientFactory;
            _converter = converter;
        }
        
		//TODO - Make Task response type + add query data + remove this silly comment
        public async Task<IList<dynamic>> GetList()
        {
            var query = new FtgListRequest
            {
                ListName = "",
                Columns = "",
                Filter = ""
            };

            var response = await _webClientFactory.FtgListAsync(query);

            if (response.IsErrorFree)
            {
                return _converter.ConvertJsonToList(response.RestResponse);
            }

            if (response.IsSystemError)
            {
                _logger.App().Error($"Failed to process : {query.Url}, error: {response.ErrorMessage}");
                throw new RepositoryException(Res--ModuleName--.FailedToGetList);
            }
            _logger.DataIntegration().Warn($"Failed to process : {query.Url}, error: {response.ErrorMessage} {response.RestResponse}");
            throw new RepositoryException(response.ErrorMessage);
        }
    }
}