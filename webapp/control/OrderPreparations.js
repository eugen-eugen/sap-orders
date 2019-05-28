sap.ui.define([
	"sap/ui/core/XMLComposite"], function(XMLComposite){
		"use strict";
		return XMLComposite.extend("moldawski.Orders.control.OrderPreparations", {
			metadata: {
				properties: {
					switchStateItems: {type: "boolean", defaultValue: false},
					switchStateInvoice: {type: "boolean", defaultValue: false},
					switchStateSample: {type: "boolean", defaultValue: false}
				},
				events: {
					confirm: {}
				}
			},
			
			onConfirm: function(){
				this.byId("oderPreparations").setExpanded(false);
				this._resetSwitches();
			},
			
			reset: function(){
				this._resetSwitsches();
			},
			
			_resetSwitsches: function(){
				this.setSwitchStateInvoice(false);
				this.setSwitchStateItems(false);
				this.setSwitchStateSample(false);
			}
		});
	});