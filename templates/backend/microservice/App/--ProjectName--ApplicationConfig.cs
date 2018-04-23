using --ProjectFullName--.App.Interfaces;
using H2OMicroService.App;
using H2OMicroService.App.Models;

namespace --ProjectFullName--.App
{
    public class BusinessTripApplicationConfig : IBusinessTripApplicationConfig
    {
        public string H2OGateWay => Properties.Settings.Default.H2OGateWay;
        public string H2OApplicationHost => Properties.Settings.Default.H2OApplicationHost;
        public string WebClientProxyUrl => Properties.Settings.Default.WebClientProxyUrl;
        public string ApplicationName => "--ProjectNameToLower--";
        public string InstanceName => Properties.Settings.Default.InstanceName;
        public string ApplicationSecret => "vdfi4asfay25plufsbclcms452ae2fuefcdb09f2981d10bay19aimspla2xld6y7"; //TODO - need to generate application secret
        public string BuildNumber => H2OApplicationConfig.GetApplicationVersion();
        public bool LoadAudienceSettingsFromGateway => false;
        public bool LoadAuthenticationSettingsFromGateway => true;
        public bool LoadCertificatesFromGateWay => true;
        public string LogFileDirectory => Properties.Settings.Default.LogFileDirectory;
        public string LogFileMinLevel => Properties.Settings.Default.LogFileMinLevel;
        public long LogRequestsLargerThanMiliseconds => 2000;

        public H2OApplicationSignatureModel ApplicationSignature => new H2OApplicationSignatureModel
        {
            Password = "TODO-generate password",
            PrivateKey = "TODO-add private key"
        };
    }
}
