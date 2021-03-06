sap.ui.define([
	"./BaseController",
	"sap/m/MessageToast"
	], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("moldawski.Orders.controller.Create", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf moldawski.Orders.view.Create
		 */
		onInit: function () {
			// create a message manager and register the message model
			this._oMessageManager = sap.ui.getCore().getMessageManager();
			this._oMessageManager.registerObject(this.getView(), true);
			this.setModel(this._oMessageManager.getMessageModel(), "message");
			this.getRouter().getRoute("create").attachPatternMatched(this._onCreateMatched, this);
			// reset potential server-side messages
			this._oMessageManager.removeAllMessages();

		},

		_onCreateMatched: function (oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;

			// create a binding context for a new order item
			this.oContext = this.getModel().createEntry("/SalesOrderLineItemSet", {
				properties: {
					SalesOrderID: sObjectId,
					ProductID: "",
					Note: "",
					Quantity: "1",
					DeliveryDate: new Date()
				},
			
				success: this._onCreateSuccess.bind(this)
			});
			this.getView().setBindingContext(this.oContext);
			this.getModel("appView").setProperty("/layout", "ThreeColumnsMidExpanded");
			var oToday = new Date();
			oToday.setHours(0, 0, 0, 0);
			//"dynamic constraint"
			this.byId("deliveryDate").getBinding("value").getType().setConstraints({
				minimum: oToday
			});
		},
		onCancel: function () {
			var sObjectId = this.getView().getBindingContext().getProperty("SalesOrderID");

			// discard the new context on cancel
			this.getModel().deleteCreatedEntry(this.oContext);

			// close the third column
			this.getRouter().navTo("object", {
				objectId: sObjectId
			}, true);
		},

		onNameChange: function () {
			// clear potential server-side messages to allow saving the item again
			this._oMessageManager.getMessageModel().getData().forEach(function (oMessage) {
				if (oMessage.code) {
					this._oMessageManager.removeMessages(oMessage);
				}
			}.bind(this));
		},

		onOpenMessages: function (oEvent) {
			var popOver = this.byId("messages");
			if (!popOver.isOpen()) {
				this.byId("messages").openBy(oEvent.getSource());
			} else {
				popOver.close();
			}
		},
		_onCreateSuccess: function (oContext) {
			// show success message
			var sMessage = this.getResourceBundle().getText("newItemCreated", [oContext.ProductID]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation: false
			});

			// navigate to the new item in display mode
			this.getRouter().navTo("Info", {
				objectId: oContext.SalesOrderID,
				itemPosition: oContext.ItemPosition
			}, true);
		},

		onCreate: function () {
			// send new item to server for processing
			this.getModel().submitChanges();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf moldawski.Orders.view.Create
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf moldawski.Orders.view.Create
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf moldawski.Orders.view.Create
		 */
		//	onExit: function() {
		//
		//	}

	});

});