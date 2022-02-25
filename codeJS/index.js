const app = angular.module("my_app", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix("");
	$routeProvider
		.when("/", {
			templateUrl: "pages/trangchu.html",
		})
		.when("/gioithieu", {
			templateUrl: "pages/gioithieu.html",
		})
		.when("/lienhe", {
			templateUrl: "pages/lienhe.html",
		})
		.when("/gopy", {
			templateUrl: "pages/gopy.html",
		})
		.when("/hoidap", {
			templateUrl: "pages/hoidap.html",
		})
		.when("/danhmucmonhoc", {
			templateUrl: "pages/danhmucmonhoc.html",
		})
		.when("/thitracnghiem", {
			templateUrl: "pages/thitracnghiem.html",
		})
		.when("/quanLyTaiKhoan", {
			templateUrl: "pages/quanLyTaiKhoan.html",
		})
		.when("/quanLyMonHoc", {
			templateUrl: "pages/quanLyMonHoc.html",
		})
		.when("/quiz/:id/:name", {
			templateUrl: "pages/thitracnghiem.html",
			// controller="quizsCtrl"
		});
});
function controller($scope) {}

app.controller(
	"quizsCtrl",
	function ($scope, $http, $routeParams, quizFactory) {
		$http.get("db/Quizs/" + $routeParams.id + ".js").then(function (reponse) {
			quizFactory.questions = reponse.data;
		});
	}
);

function danhMucMonHoc($scope, $http, $rootScope) {
	$rootScope.list_monHoc = [];
	$scope.index = -1;
	$http.get("db/Subjects.js").then(function (reponse) {
		$rootScope.list_monHoc = reponse.data;
	});

	$scope.editMonHoc = function (index) {
		$scope.index = index;
		$scope.monHoc = angular.copy($rootScope.list_monHoc[index]);
	};

	$scope.add = function () {
		$rootScope.list_monHoc.push(angular.copy($scope.monHoc));
		$scope.refesh();
	};
	$scope.update = function () {
		$rootScope.list_monHoc[$scope.index] = $scope.monHoc;
	};
	$scope.delete = function (index) {
		$rootScope.list_monHoc.splice(index, 1);
		$scope.refesh();
	};
	$scope.refesh = function () {
		$scope.monHoc = {};
		$scope.index = -1;
	};
}

function thongTinTaiKhoan($scope, $http, $rootScope) {
	$scope.dangKy = {};
	$scope.mkMoi = {};
	$scope.doiMatKhau = {};
	$scope.login = {};
	$scope.capNhatThongTinTaiKhoan = {};
	$rootScope.students = [];
	$rootScope.user;
	$rootScope.tenNguoiDung;
	$rootScope.phanquyen;
	const url = "https://62150171cdb9d09717a9c4e3.mockapi.io/students";
	$http.get(url).then(function (reponse) {
		$rootScope.students = reponse.data;
		console.log($rootScope.students);
	});

	$scope.login = function () {
		var i;
		for (i = 0; i < $rootScope.students.length; i++) {
			if (
				$rootScope.students[i].username == $scope.login.username &&
				$rootScope.students[i].password == $scope.login.password
			) {
				$rootScope.user = $rootScope.students[i].username;
				console.log($rootScope.user);
				$rootScope.tenNguoiDung = $rootScope.students[i].fullname;
				if ($rootScope.students[i].phanquyen == "admin") {
					$rootScope.phanquyen = $rootScope.students[i].phanquyen;
				}
				Swal.fire({
					icon: "success",
					title: "Đăng nhập thành công",
					text: "Chuyển hướng đến trang chủ !",
					showConfirmButton: false,
					timer: 1000,
				});
				window.location.href = "#/";
				return;
			} else {
				Swal.fire({
					icon: "error",
					title: "Đăng nhập thất bại",
					text: "Mật khẩu không chính xác !",
				});
			}
		}
	};

	$scope.signUp = function () {
		if ($scope.dangKy.password == $scope.password2) {
			$http.post(url, $scope.dangKy).then(function (response) {});
			Swal.fire({
				icon: "success",
				title: "Đăng ký thành công",
				text: "Chuyển hướng đến trang chủ !",
				showConfirmButton: false,
				timer: 1000,
			});
			console.log($rootScope.students);
			window.location.href = "#/";
			return;
		} else {
			Swal.fire({
				icon: "error",
				title: "Đăng ký thất bại",
			});
			return;
		}
	};

	$scope.doiMatKhau = function () {
		for (let i = 0; i < $rootScope.students.length; i++) {
			const urlId = url + "/" + i;
			if (
				$rootScope.students[i].username == $rootScope.user &&
				$rootScope.students[i].password == $scope.doiMatKhau.password1 &&
				$scope.doiMatKhau.password2 == $scope.mkMoi.password
			) {
				$http.put(urlId, $scope.mkMoi).then(function (response) {
					Swal.fire({
						icon: "success",
						title: "Đổi mật khẩu thành công !",
						text: "Chuyển hướng đến trang chủ !",
						showConfirmButton: false,
						timer: 1000,
					});
					window.location.href = "#/";
					console.log($rootScope.students);
				});
				return;
			} else if ($scope.doiMatKhau.password2 != $scope.mkMoi.password) {
				Swal.fire({
					icon: "error",
					title: "Mật khẩu mới không khớp nhau !",
				});
			} else if (
				$rootScope.students[i].password != $scope.doiMatKhau.password1
			) {
				Swal.fire({
					icon: "error",
					title: "Mật khẩu cũ không đúng !",
				});
			}
		}
	};

	$scope.capNhatThongTin = function () {
		console.log($rootScope.user);
		for (let i = 0; i < $rootScope.students.length; i++) {
			const urlId = url + "/" + i;
			if ($rootScope.user == $rootScope.students[i].username) {
				$http
					.put(urlId, $scope.capNhatThongTinTaiKhoan)
					.then(function (response) {
						Swal.fire({
							icon: "success",
							title: "Đổi thông tin thành công !",
							text: "Chuyển hướng đến trang chủ !",
							showConfirmButton: false,
							timer: 1000,
						});
						window.location.href = "#/";
						console.log($rootScope.students);
						return;
					});
			}
		}
	};

	$scope.dangXuatTaiKhoan = function () {
		$rootScope.user = null;
		Swal.fire({
			icon: "success",
			title: "Đăng xuất thành công !",
			text: "Chuyển hướng đến trang chủ !",
			showConfirmButton: false,
			timer: 1000,
		});
		console.log($rootScope.students);
		window.location.href = "#/";
	};
}

function danhMucTaiKhoan($scope, $rootScope, $http) {
	const url = "https://62150171cdb9d09717a9c4e3.mockapi.io/students";
	$scope.qlTaiKhoan;
	$scope.editTaiKhoan = function (index) {
		$scope.index = index;
		$scope.qlTaiKhoan = angular.copy($rootScope.students[index]);
	};

	$scope.addTaiKhoan = function () {
		$http.post(url, $scope.qlTaiKhoan).then(function (response) {
			// Thêm vào table
			$scope.students.push(response.data);
			$scope.refeshTaiKhoan();
			console.log($rootScope.students);
			Swal.fire({
				icon: "success",
				title: "Thêm thành công !",
				showConfirmButton: false,
				timer: 1000,
			});
		});
	};
	$scope.updateTaiKhoan = function () {
		for (let i = 0; i < $rootScope.students.length; i++) {
			const urliD = url + "/" + i;
			if ($rootScope.students[i].username == $scope.qlTaiKhoan.username) {
				$http.put(urliD, $scope.qlTaiKhoan).then(function (response) {
					$http.get(url).then(function (reponse) {
						$rootScope.students = reponse.data;
						console.log($rootScope.students);
					});
					$scope.refeshTaiKhoan();
					console.log($rootScope.students);
					Swal.fire({
						icon: "success",
						title: "Sửa thành công !",
						showConfirmButton: false,
						timer: 1000,
					});
				});
			}
		}
	};
	$scope.deleteTaiKhoan = function (index) {
		const id = $rootScope.students[index].id;
		const apiDelete = url + "/" + id;
		// Gọi API với method DELETE
		$http.delete(apiDelete).then(function (response) {
			// Xóa trên table
			$rootScope.students.splice(index, 1);
			Swal.fire({
				icon: "success",
				title: "Xoá thành công !",
				showConfirmButton: false,
				timer: 1000,
			});
			$scope.refeshTaiKhoan();
		});
	};
	$scope.refeshTaiKhoan = function () {
		$scope.qlTaiKhoan = {};
		$scope.index = -1;
	};
}

app.directive("quizfpoly", function (quizFactory, $routeParams) {
	return {
		restrict: "AE",
		$scope: {},
		templateUrl: "pages/template-quiz.html",
		link: function ($scope, elem, attrs) {
			$scope.start = function () {
				quizFactory.getQuestions().then(function () {
					$scope.subjectName = $routeParams.name;
					$scope.Logo = $routeParams.Logo;
					$scope.id = 1;
					$scope.quizOver = false;
					$scope.inProgess = true;
					$scope.getQuestion();
				});
			};
			$scope.reset = function () {
				$scope.inProgess = false;
				$scope.score = 0;
			};
			$scope.getQuestion = function () {
				var quiz = quizFactory.getQuestion($scope.id);
				if (quiz) {
					$scope.question = quiz.Text;
					$scope.options = quiz.Answers;
					$scope.answer = quiz.AnswerId;
					$scope.answerMode = true;
				} else {
					$scope.quizOver = true;
				}
			};
			$scope.checkAnswer = function () {
				// alert('answer');
				if (!$("input[name = answer]:checked").length) return;
				var ans = $("input[name = answer]:checked").val();
				console.log(ans);
				if (ans == $scope.answer) {
					// alert("đúng");
					$scope.score++;
					$scope.correctAns = true;
				} else {
					$scope.correctAns = false;
				}
				$scope.answerMode = false;
			};
			$scope.nextQuestion = function () {
				$scope.id++;
				$scope.getQuestion();
			};
			$scope.reset();
		},
	};
});

app.factory("quizFactory", function ($http, $routeParams) {
	return {
		getQuestions: function () {
			return $http
				.get("db/Quizs/" + $routeParams.id + ".js")
				.then(function (reponse) {
					questions = reponse.data;
				});
		},

		getQuestion: function (id) {
			var randomItem = questions[Math.floor(Math.random() * questions.length)];
			var count = questions.length;
			if (count > 10) {
				count = 10;
			}
			if (id < 10) {
				return randomItem;
			} else {
				return false;
			}
		},
	};
});

app.controller("my_controller", controller);
app.controller("my_DanhMucMonHoc", danhMucMonHoc);
app.controller("my_danhMucTaiKhoan", danhMucTaiKhoan);
app.controller("my_ThongTinTaiKhoan", thongTinTaiKhoan);
