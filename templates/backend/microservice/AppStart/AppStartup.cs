using System.Collections.Generic;
using Autofac;
using --ProjectFullName--.App;
using --ProjectFullName--.App.Interfaces;
using --ProjectFullName--.AppStart.Interfaces;
using H2OMicroService.Components.App;
using H2OMicroService.Components.App.Interfaces;
using H2OMicroService.Feja.interfaces;
using H2OMicroService.Ftg.Enumerators;
using H2OMicroService.GateWay.Enums;
using H2OMicroService.GateWay.interfaces;
using H2OMicroService.GateWay.Models;
using H2OMicroService.MicroserviceLocations.Models;
using Newtonsoft.Json;

namespace --ProjectFullName--.AppStart
{
    public class AppStartup : IAppStartup
    {
        private IH2OGateWayService _gateWayApp;
        private I--ProjectName--ApplicationConfig _applicationConfig;
        private IFejaService _fejaService;

        public void SetServerContainer(IContainer container)
        {
            _gateWayApp = container.Resolve<IH2OGateWayService>();
            _applicationConfig = container.Resolve<I--ProjectName--ApplicationConfig>();
            _fejaService = container.Resolve<IFejaService>();
        }

        public void Run()
        {
            var application = new H2OApp
            {
                Name = _applicationConfig.ApplicationName,
                Host = _applicationConfig.H2OApplicationHost,
                RequiredModules = new List<string>
                {
                    H2OModules.--ProjectName--
                },
                ApplicationParameters = new ApplicationParameterModel
                {
                    NotificationSettings = new NotificationSettingsModel
                    {
                        AudienceSettingsChangeNotification = _applicationConfig.LoadAudienceSettingsFromGateway,
                        AuthenticationSettingsChangeNotification =
                            _applicationConfig.LoadAuthenticationSettingsFromGateway,
                        CertificatesChangeNotification = _applicationConfig.LoadCertificatesFromGateWay,
                        RestartNotification = true
                    },
                    MicroserviceAccessRules = new List<MicroserviceAccessRuleModel>
                    {
                        new MicroserviceAccessRuleModel
                        {
                            Code = RouteRuleEnum.AllowedUserTypes,
                            Value = JsonConvert.SerializeObject(new List<int>
                            {
                                (int) HorizonUserType.HorizonPersonCard,
                                (int) HorizonUserType.HorizonFakePerson,
                                (int) HorizonUserType.HorizonPersonCardWithoutLegalRelationships
                            })
                        },
                        new MicroserviceAccessRuleModel
                        {
                            Code = RouteRuleEnum.MinFtgVersion,
                            Value = "3.510.510.0"
                        }
                    }
                }
            };

#if DEBUG
            _fejaService.Add("--ProjectName--.tp.js", true)
                .Add("--ProjectName--.css");
#else
            _fejaService.Add("--ProjectName--.tp.es5.min.js", true)
            .Add("--ProjectName--.min.css");
#endif
            SetupLogicalApp(application);
            _gateWayApp.RegisterApp(application);
        }

        private static void SetupLogicalApp(IH2OApp application)
        {
            var --ProjectNameFirstLower--List = new H2OAngularState
            {
                Title = "--ProjectName--",
                State = "H2O.--ProjectNameToLower--.list",
                HtmlId = "--ProjectNameToLower--",
                StateType = H2OStateType.Root,
                Icon = "data:image/png;base64,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"
            };
            application.AngularStates.Add(--ProjectNameFirstLower--List);
        }
    }
}
