sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("moldawski.Orders.controller.Info", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf moldawski.Orders.view.Info
		 */
		onInit: function () {
            this.getRouter().getRoute("Info").attachPatternMatched(
            	this._onInfoMatched, this);
		},
		
		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onInfoMatched: function (oEvent) {
			this.getModel("appView").setProperty("/layout", "ThreeColumnsMidExpanded");
			var sObjectId = oEvent.getParameter("arguments").objectId,
				sItemPosition = oEvent.getParameter("arguments").itemPosition;

			this.getModel("appView").setProperty("/layout", "ThreeColumnsEndExpanded");
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("SalesOrderLineItemSet", {
					SalesOrderID: sObjectId,
					ItemPosition: sItemPosition
				});
				this.getView().bindElement({
					path: "/" + sObjectPath,
					parameters: {
						'expand': 'ToHeader, ToProduct'
					}
				});
			}.bind(this));
		}


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf moldawski.Orders.view.Info
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf moldawski.Orders.view.Info
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf moldawski.Orders.view.Info
		 */
		//	onExit: function() {
		//
		//	}

	});

});