sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (Controller, MessageToast, Fragment, Filter, FilterOperator,Sorter) {
    "use strict";

    return Controller.extend("project3.controller.Main", {

        onInit: function () {
            var oModel = this.getOwnerComponent().getModel();
            this.getView().setModel(oModel);
        },

        onItemSelect: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();

            var oHomeBox = this.byId("homeBox");
            var oAboutBox = this.byId("aboutBox");
            var oSareeTable = this.byId("sareeTable");
            var oOffer = this.byId("offerBox");

            oHomeBox.setVisible(false);
            oAboutBox.setVisible(false);
            oSareeTable.setVisible(false);
            oOffer.setVisible(false);

            if (sKey === "home") {
                oHomeBox.setVisible(true);
            } else if (sKey === "about") {
                oAboutBox.setVisible(true);
            } else if (sKey === "saree") {
                oSareeTable.setVisible(true);
            } else if (sKey === "offers") {
                oOffer.setVisible(true);
            }
        },

        onExplorePress: function () {
            this.byId("homeBox").setVisible(false);
            this.byId("aboutBox").setVisible(false);
            this.byId("sareeTable").setVisible(true);
            this.byId("offerBox").setVisible(false);
        },

        onDownloadPress: function (oEvent) {
            var oButton = oEvent.getSource();
            var oRow = oButton.getParent();
            var oContext = oRow.getBindingContext();
            var oData = oContext.getObject();
            var sUrl = oData.Url;

            var link = document.createElement("a");
            link.href = sUrl;
            link.download = "SareeImage.jpg";
            link.click();
        },

        onBuyNow: function () {
            var oView = this.getView();

            if (!this.oPaymentDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "project3.view.Dialog",
                    controller: this
                }).then(function (oDialog) {
                    this.oPaymentDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.oPaymentDialog.open();
            }
        },

        onGpay: function () {
            MessageToast.show("Google Pay Selected");
            this.oPaymentDialog.close();
        },

        onPhonePe: function () {
            MessageToast.show("PhonePe Selected");
            this.oPaymentDialog.close();
        },

        onAmazonPay: function () {
            MessageToast.show("Amazon Pay Selected");
            this.oPaymentDialog.close();
        },

        onClose: function () {
            this.oPaymentDialog.close();
        },

        onSearch: function (oEvent) {
            var sValue = oEvent.getParameter("newValue");

            // ✅ Fixed - correct table ID from view
            var oTable = this.byId("sareeTable");
            var oBinding = oTable.getBinding("items");

            // Empty search → show all rows
            if (!sValue) {
                oBinding.filter([]);
                return;
            }

            // String filters
            var aFilters = [
                new Filter("Name", FilterOperator.Contains, sValue),
                new Filter("Description", FilterOperator.Contains, sValue),
                new Filter("Status", FilterOperator.Contains, sValue)
            ];


            var oFilter = new Filter({
                filters: aFilters,
                and: false  
            });

            oBinding.filter([oFilter]);
        },
        onSort:function(){
            var oTable = this.byId("sareeTable");
            var oBind = oTable.getBinding("items");
            var oSorter = new Sorter("Price",false);
            oBind.sort(oSorter);
        }
    });
});