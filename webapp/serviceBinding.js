function initModel() {
	var sUrl = "/apihub_sandbox/s4hanacloud/sap/opu/odata/sap/API_WORK_CENTERS/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}