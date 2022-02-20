const app = angular.module("my_app", []);
			function controller($scope) {}

			function danhMucMonHoc($scope, $http) {
				$scope.list_monHoc = [];
				$http.get("db/Subjects.js").then(function (reponse) {
					$scope.list_monHoc = reponse.data;
				});
			}

			function thongTinTaiKhoan($scope, $http) {
				$scope.dangKy = {}
				$scope.list_taiKhoan = [];
				$http.get("db/Students.js").then(function (reponse) {
					$scope.list_taiKhoan = reponse.data;
					console.log($scope.list_taiKhoan)
					
				});
				$scope.login = function(){
					for (let i = 0; i < $scope.list_taiKhoan.length; i++) {
						if ($scope.list_taiKhoan[i].username == $scope.login.username &&
							$scope.list_taiKhoan[i].password == $scope.login.password) {
							console.log("Đăng nhập thành công!")
							alert("Đăng nhập thành công!");
							console.log($scope.list_taiKhoan)
							return;
						}else{
							console.log("Đăng nhập thất bại")
							alert("Đăng nhập thất bại")
							console.log($scope.list_taiKhoan)
							return
						}
					}
				}
				$scope.signUp = function(){
						if ($scope.dangKy.password == $scope.password2) {
							$scope.list_taiKhoan.push(angular.copy($scope.dangKy));
							console.log("Đăng ký thành công!");
							alert("Đăng ký thành công!")
							console.log($scope.dangKy.password);
							console.log($scope.password2);
							console.log($scope.list_taiKhoan)
							return;
						}else{
							console.log("Đăng ký thất bại!")
							alert("Đăng ký thất bại!")
							console.log($scope.list_taiKhoan)
							return;
						}
				}
				$scope.doiMatKhau = function(){
					for (let i = 0; i < $scope.list_taiKhoan.length; i++) {
						if($scope.list_taiKhoan[i].username == 'teonv'){
							$scope.list_taiKhoan[i].password = $scope.doiMatKhau.password2;
							alert("Đổi mật khẩu thành công");
							console.log($scope.list_taiKhoan);
							return;
						}else{
							alert("Đổi mật khẩu thất bại");
							console.log($scope.list_taiKhoan);
							return;
						}
						
					}
				}
			}
			
			app.controller("my_controller", controller);
			app.controller("my_DanhMucMonHoc", danhMucMonHoc);
			app.controller("my_ThongTinTaiKhoan", thongTinTaiKhoan);