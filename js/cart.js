/**
 * Created by kauriHealth on 2017/9/12.
 */

(function (angular) {

    var app = angular.module('cartapp',[]);

    app.controller('cartController',['$scope',function ($scope) {

        $scope.cart=[
            {
                id:1001,
                name:'iPhone6S',
                price:5288,
                quality:10,
                isChecked:true
            },
            {
                id:1002,
                name:'iPhone6SP',
                price:6358,
                quality:5,
                isChecked:true
            },
            {
                id:1003,
                name:'iPhone7',
                price:6288,
                quality:3,
                isChecked:false
            },
            {
                id:1004,
                name:'iPhone8',
                price:7278,
                quality:30,
                isChecked:false
            },
            {
                id:1005,
                name:'MACPRO',
                price:16288,
                quality:10,
                isChecked:true
            },
            {
                id:1006,
                name:'applewatch10',
                price:5555,
                quality:2,
                isChecked:true
            },
            {
                id:1007,
                name:'ipadmini',
                price:6665,
                quality:4,
                isChecked:true
            }
        ];
        /*
         *操作商品
         */
        var findIndex = function (id) {

            var Index = -1;
            angular.forEach($scope.cart,function (item,index) {
                if (item.id ==  id){
                    Index = index;
                    return Index;
                }
            });
            return Index;
        };

        /*
         *增加商品
         */
        $scope.add = function (id) {
            var index = findIndex(id);
            $scope.cart[index].quality++;

        };

        /*
         *减少商品
         */
        $scope.reduced = function (id) {
            var index = findIndex(id);
            if (index !== -1){
                if ($scope.cart[index].quality>1){
                    $scope.cart[index].quality--;
                }else {
                    confirms('你确定删除商品'+$scope.cart[index].name+'吗','提示');
                    document.getElementById("confirmY").addEventListener("click",function() {
                        $scope.cart.splice(index,1);
                        $scope.$apply();
                    });
                }

            }


        };

        /*
         *删除商品
         */
        $scope.delete = function (ID) {

            confirms('你确定删除么?','提示');
            document.getElementById("confirmY").addEventListener("click",function() {
                $scope.remove(ID);
                $scope.$apply();
            });
            document.getElementById("confirmX").addEventListener("click",function() {
            });
        };

        /*
        *总价格
        */
        $scope.totalPrice = function () {
            var total = 0;
            angular.forEach($scope.cart,function (item,index) {
                if(item.isChecked){
                    total += item.price*item.quality;
                }
               });
            return total;
        };

        /*
         *总数量
         */
        $scope.totalCount = function () {
            var total = 0;
            angular.forEach($scope.cart,function (item,index) {
                if (item.isChecked){
                    total += item.quality;
                }

            });
            return total;
        };

        /*
         *监听数据改变
         *$scope.$watch监听对象cart的变化
         * true可选的布尔值命令检查被监控的对象的每个属性是否发生变化
         */
        $scope.$watch('cart',function (valnew,valold) {

            var count = 0;
            angular.forEach(valnew,function (item,key) {

                {

                    if(item.isChecked){
                        count++;
                    }
                    console.log(count)
                    if(count === $scope.cart.length){
                        var ele = document.getElementsByClassName('selectAll')[0];
                        ele.checked = true;
                    }else{
                        var ele = document.getElementsByClassName('selectAll')[0];
                        ele.checked = false;
                    }


                }

                if(item.quality<1){

                    confirms('你确定删除么?','提示');
                    document.getElementById("confirmY").addEventListener("click",function() {
                        $scope.remove(item.id);
                        $scope.$apply();
                    });
                    document.getElementById("confirmX").addEventListener("click",function() {
                        item.quality = valold[key].quality;
                    });

                }


            });

        },true)

        /*
         *移除
         */
        $scope.remove = function (ID) {
            var Index = -1 ;
            var name = '';
            angular.forEach($scope.cart,function (item,index) {
                if (item.id ==  ID){
                    Index = index;
                }
            });
            if (Index !== -1){
                $scope.cart.splice(Index,1);
                $scope.$apply();
            }


        };

        /*
         *选中
         */
        $scope.checkClick = function (ID) {

            var index =findIndex(ID);
            var ele = document.getElementsByClassName('selectItem')[index];

            if(ele.checked){
                $scope.cart[index].isChecked = true;
            }else {
                $scope.cart[index].isChecked = false;
            }
        };

        /*
         *全选
         */
        $scope.checkAll = function () {

            var ele = document.getElementsByClassName('selectAll')[0];
            if(ele.checked){
                angular.forEach($scope.cart,function (item,key) {
                   item.isChecked = true;
                });
            }else{
                angular.forEach($scope.cart,function (item,key) {
                    item.isChecked = false;
                });
            }
        };

        /*
         *选中
         */
        $scope.pay = function () {

          console.log('pay');
          confirms('您购买了'+$scope.totalCount()+'件商品,总计'+$scope.totalPrice()+'元','提示');


        };
    // end

    }])

})(angular);