;(function(angular){
	"use strict";
	
		
		angular.module("joborderreportmodule",[])
		.controller("joborderreportcontroller", function($scope, $http, dateRangeService){
			
			$scope.currentDateWithTime = new Date();
			$scope.jobOrderInfo = [];
			//$scope.customJobOrderTable = false;
			//$scope.startDate = new Date();
			var startDateVal = new Date();
			startDateVal.setDate(1);
			$scope.startDate = startDateVal;
			$scope.endDate = new Date();
			//$scope.obj = {};
			$scope.errMsg = false;
			$scope.onload = function(){
				
				$scope.DateFormat = 'MM-dd-yyyy';
				
				$scope.startDateOptions = {
						date : new Date(),
						showWeeks : false
					};
				$scope.startDateopen = function() {
					$scope.startDatePopup.opened = true;
				};
				$scope.startDatePopup = {
						opened : false
					};
				
				$scope.endDateOptions = {
						date : new Date(),
						showWeeks : false
					};
				$scope.endDateopen = function() {
					$scope.endDatePopup.opened = true;
				};
				$scope.endDatePopup = {
						opened : false
					};
				
				$scope.getJobOrders();
				}
			
			$scope.getJobOrders = function(){
				$scope.customJobOrderTable = false;
				var startDate = dateRangeService.formatDate($scope.startDate);
				var endDate =  dateRangeService.formatDate($scope.endDate);
				$scope.obj = {
						"startDate" : startDate,
						"endDate" : endDate
				};
				alert($scope.startDate + "  "+ $scope.endDate);
//				alert(JSON.stringify($scope.obj));
				if(endDate >= startDate && startDate!=null && endDate!=null){
				var response = $http.post("customReports/getJobOrdersCustomReportData", $scope.obj);
				response.success(function(data, config, headers, status){
					//alert(JSON.stringify(data));
					if(data){
						$scope.errMsg=false;
						$scope.clientWiseSbmList = data.gridData; 
						$scope.exportClientWiseSbmList = [];
						
						for (var i = 0; i <data.gridData.length; i++) {
							var obj = {jobOrderId:data.gridData[i].orderId,
									CreatedDate: data.gridData[i].createdOn,ClientName: data.gridData[i].jobClient,
									Title: data.gridData[i].jobTitle,DMName:data.gridData[i].dmName,AssignedTo: data.gridData[i].assignedTo,Positions: data.gridData[i].noOfPositions,
									SBM: data.gridData[i].submittedCount,Confirmed: data.gridData[i].confirmedCount,
									Started: data.gridData[i].startedCount,NetPositions: data.gridData[i].netPositions};
							$scope.exportClientWiseSbmList.push(obj);
						}
						
						$scope.noOfJobOrders = data.gridData.length;
						$scope.noOfStarts = data.noOfStarts;
						$scope.noOfPos = data.noOfPos;
						$scope.netPositions = data.netPositions;
						$scope.noOfSub = data.noOfSub;
						$scope.noOfConfirmed = data.noOfConfirmed;
						$scope.customJobOrderTable = true;
						customJobOrderTableView();
						$scope.jobOrderInfo.jobOrderTableControl.options.data=data.gridData;
					}else{
						$scope.customJobOrderTable = true;
						customJobOrderTableView();
					}
				});
				response.error(function(data, status, headers, config){
					  if(status == constants.FORBIDDEN){
						location.href = 'login.html';
					  }else{  			  
						$state.transitionTo("ErrorPage",{statusvalue  : status});
					  }
				  });
				}else{
					$scope.errMsg=true;
					$scope.customJobOrderTable = true;
				}
			}
			
			$scope.getTimeFnc = function(){
				$scope.currentDateWithTime = new Date();
			}
			
			function customJobOrderTableView(){
				 $scope.jobOrderInfo.jobOrderTableControl = {
		                    options: { 
		                        striped: true,
		                        pagination: true,
		                        paginationVAlign: "bottom", 
		                        pageList: [50,100,200],
		                        search: false,
		                        //sidePagination : 'server',
		                        silentSort: false,
		                        showColumns: false,
		                        showRefresh: false,
		                        clickToSelect: false,
		                        showToggle: false,
		                        maintainSelected: true, 
		                        showFooter : false,
		                        columns: [
		                        {
		                            field: 'orderId',
		                            title: 'Job Order Id',
		                            align: 'left',
		                            
		                        },{
		                            field: 'createdOn',
		                            title: 'Created Date',
		                            align: 'left',
		                            
		                        }, {
		                            field: 'jobClient',
		                            title: 'Client Name',
		                            align: 'left',
		                           
		                        },{
		                            field: 'jobTitle',
		                            title: 'Title',
		                            align: 'left',
		                           
		                        },{
		                            field: 'dmName',
		                            title: 'DM Name',
		                            align: 'left',
		                           
		                        },{
		                            field: 'assignedTo',
		                            title: 'Assigned To',
		                            align: 'left',
		                           
		                        },{
		                            field: 'noOfPositions',
		                            title: '# Positions',
		                            align: 'left',
		                           
		                        },{
		                            field: 'submittedCount',
		                            title: 'SBM',
		                            align: 'left',
		                           
		                        },{
		                            field: 'confirmedCount',
		                            title: 'Confirmed',
		                            align: 'left',
		                           
		                        },{
		                            field: 'startedCount',
		                            title: 'Started',
		                            align: 'left',
		                           
		                        },{
		                            field: 'netPositions',
		                            title: 'Net Positions',
		                            align: 'left',
		                           
		                        }/*{
		                            field: 'startedDate',
		                            title: 'Started Date',
		                            align: 'left',
		                           
		                        }*/]
		                    }
		            };
			}
			
		});
})(angular);