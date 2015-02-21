﻿(function () {
    "use strict";

    northwindApp.controller("SupplierController", ["$log", "$scope", "$location", "$routeParams", "ngTableParams", "$filter", "SupplierService", function ($log, $scope, $location, $routeParams, ngTableParams, $filter, supplierService) {
        $scope.result = {};

        supplierService.getAll().then(function (result) {
            $scope.result = result.data;

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: "asc"
                }
            }, {
                total: $scope.result.model.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter("orderBy")($scope.result.model, params.orderBy()) : $scope.result.model;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });
    }]);

    northwindApp.controller("CreateSupplierController", CreateSupplierController);
    northwindApp.controller("EditSupplierController", EditSupplierController);
    
    //SupplierController.$inject = ["$scope", "$location", "$routeParams", "SupplierService"];
    CreateSupplierController.$inject = ["$scope", "$location", "SupplierService"];
    EditSupplierController.$inject = ["$scope", "$location", "$routeParams", "SupplierService"];

    //function SupplierController($scope, $location, $routeParams, supplierService) {
    //    $scope.title = "SupplierController";
    //    $scope.suppliers = [];

    //    supplierService.getAll().then(function (result) {
    //        $scope.suppliers = result.data;
    //    });

    //    $scope.create = function () {
    //        $location.path("/supplier-create");
    //    };

    //    $scope.details = function (id) {
    //        $location.path("/supplier-details/" + id);
    //    };

    //    $scope.edit = function (id) {
    //        $location.path("/supplier-edit/" + id);
    //    };

    //    $scope.delete = function (id) {
    //        $location.path("/supplier-delete/" + id);
    //    };
    //};

    function CreateSupplierController($scope, $location, supplierService) {
        $scope.model = {};

        $scope.create = function () {
            supplierService.create($scope.model);
            $location.path("/suppliers");
        };

        $scope.cancel = function () {
            $location.path("/suppliers");
        };
    };

    function EditSupplierController($scope, $location, $routeParams, supplierService) {
        $scope.model = {};

        supplierService.get($routeParams.id).then(function (result) {
            $scope.model = result.data;
        });

        $scope.edit = function (id) {
            $location.path("/supplier-edit/" + id);
        };

        $scope.update = function () {
            supplierService.update($scope.model);

            $location.path("/suppliers");
        };

        $scope.delete = function () {
            supplierService.delete($scope.model);

            $location.path("/suppliers");
        };

        $scope.cancel = function () {
            $location.path("/suppliers");
        };
    };
})();
