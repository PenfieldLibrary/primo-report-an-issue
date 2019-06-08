(function () {
    "use strict";
    'use strict';

var app = angular.module('viewCustom', ['angularLoad']); 

//Load latest jquery
app.component('prmTopBarBefore', {
		bindings: {parentCtrl: '<'},
		controller: function () {
			this.$onInit = function () {
				loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js", jquery_loaded);
			};
		},
		template: ''
	});
	
	

function insertActions(actions) {
		app.service('customActionService', function() {
			return {
				actions: [],
				processCustomAction: function(prmActionCtrl, action) {
					action.slug = action.name.replace(/\s+/g, ''); // remove whitespace
					action.iconname = action.slug.toLowerCase();
					action.index = Object.keys(prmActionCtrl.actionListService.actionsToIndex).length - 1 ; // ignore "none" and RISPushTo
					this.actions.push(action);
					return action;
				},
				setCustomAction: function(prmActionCtrl, action) {
						console.dir(prmActionCtrl);
						prmActionCtrl.actionLabelNamesMap[action.slug] = action.name;
						prmActionCtrl.actionIconNamesMap[action.slug] = action.iconname;
						prmActionCtrl.actionIcons[action.iconname] = {
							icon: action.icon.name,
							iconSet: action.icon.set,
							type: "svg"
						};
						if (!prmActionCtrl.actionListService.actionsToIndex[action.slug]) { // ensure we aren't duplicating the entry
							prmActionCtrl.actionListService.requiredActionsList[action.index] = action.slug;
							prmActionCtrl.actionListService.actionsToDisplay.unshift(action.slug);
							prmActionCtrl.actionListService.actionsToIndex[action.slug] = action.index;
						}
						if (action.type === 'template') {
							
						  if (action.hasOwnProperty('templateVar')) {
							  action.action = action.action.replace(/{\d}/g, function(r){return action.templateVar[r.replace(/[^\d]/g,'')]});
						  }
						  action.action = action.action.replace(/{recordId}/g, function(r) {return prmActionCtrl.item.pnx.search.recordid[0]});
						}
						
						prmActionCtrl.onToggle[action.slug] = function(){
							//console.log("open "+action.action+" in a new window");
							window.open(action.action, '_blank'); // opens the url in a new window
						};
				},
				setCustomActionContainer: function(mdTabsCtrl, action) { // for further review...
				},
				getCustomActions: function() {
					return this.actions;
				}
			};
		})
		.component('prmActionListAfter', {
			require: {
				prmActionCtrl: '^prmActionList',
			},
			controller: 'customActionController'
		})
		.component('prmActionContainerAfter', {
			controller: 'customActionContainerController'
		})
		.controller('customActionController', ['$scope', 'customActionService', function($scope, customActionService) {
			var vm = this;
			vm.$onInit = function() {
				console.log(vm.prmActionCtrl);
				
				actions.forEach(function(action) {
					var processedAction = customActionService.processCustomAction(vm.prmActionCtrl, action);
					customActionService.setCustomAction(vm.prmActionCtrl, processedAction);
					console.log("here init 2");
					console.dir(action);
				});
			};
		}])
		.controller('customActionContainerController', ['$scope','customActionService', function($scope, customActionService) {
			var vm = this;
			vm.$onInit = function() {
				console.log(vm.mdTabsCtrl);
				console.log("here init");
				console.log("here init done");
			};
		}]);
	}
	
	
	//Replace action name with you own URL and Primo Code
	insertActions([{
		name: "Report Issue",
		type: "template",
		icon: {
			set: 'action',
			name: 'ic_report_problem_24px'
		},
		action: "https://<your report URL>"+encodeURIComponent("https://<Your Primo URL>/discovery/search?query=any,contains,")+"{recordId}"+encodeURIComponent("&tab=default_tab&search_scope=all&sortby=rank&vid=<Your Primo Code>&offset=0")
	}]);


 
})();


//Code outside main function
function loadScript(url, callback)
{
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onreadystatechange = callback;
	script.onload = callback;
	head.appendChild(script);
}

var jquery_loaded = function() {
	
	$(document).ready(function(){
			
		// report an error links
		$("body").on("click","._md-nav-button",function(event){
			$(this).find("prm-icon[icon-definition='ic_report_problem_24px'] ").each(function(index) {
				var record_container = $(this).closest("prm-brief-result-container");
				var record_link = record_container.find("a");
				if(record_container.length == 0)
				{
					record_container = $(this).closest(".full-view-container");
					record_link = record_container.find("prm-brief-result-container a");
				}
				var record_url = record_link.attr("ng-href");
				//Replace this URL with your own reporting URL
				var error_report_url = "https://<your report URL>"+encodeURIComponent(record_url);
				window.open(error_report_url, '_blank'); // opens the url in a new window
			});
		});

	});
};




 