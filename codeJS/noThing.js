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
		.when("/quanLy", {
			templateUrl: "pages/quanLy.html",
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
		console.log($rootScope.list_monHoc);
	};

	$scope.add = function () {
		$rootScope.list_monHoc.push(angular.copy($scope.monHoc));
		$scope.refesh();
		console.log($rootScope.list_monHoc);
	};
	$scope.update = function () {
		$rootScope.list_monHoc[$scope.index] = $scope.monHoc;
		console.log($rootScope.list_monHoc);
	};
	$scope.delete = function (index) {
		$rootScope.list_monHoc.splice(index, 1);
		$scope.refesh();
		console.log($rootScope.list_monHoc);
	};
	$scope.refesh = function () {
		$scope.monHoc = {};
		$scope.index = -1;
	};
}

function thongTinTaiKhoan($scope, $http, $rootScope) {
	$scope.dangKy = {};
	$scope.doiMatKhau = {};
	$scope.login = {};
	$rootScope.students = [];
	$rootScope.user;
	$rootScope.tenNguoiDung;
	$rootScope.phanquyen;
	$http.get("db/Students.js").then(function (reponse) {
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
				$rootScope.tenNguoiDung = $rootScope.students[i].fullname;
				if ($rootScope.students[i].phanquyen == "admin") {
					$rootScope.phanquyen = $rootScope.students[i].phanquyen;
				}
				Swal.fire({
					icon: "success",
					title: "????ng nh???p th??nh c??ng",
					text: "Chuy???n h?????ng ?????n trang ch??? !",
					showConfirmButton: false,
					timer: 1000,
				});
				window.location.href = "#/";
				return;
			} else {
				Swal.fire({
					icon: "error",
					title: "????ng nh???p th???t b???i",
					text: "M???t kh???u kh??ng ch??nh x??c !",
				});
			}
		}
	};

	$scope.signUp = function () {
		if ($scope.dangKy.password == $scope.password2) {
			$rootScope.students.push(angular.copy($scope.dangKy));
			Swal.fire({
				icon: "success",
				title: "????ng k?? th??nh c??ng",
				text: "Chuy???n h?????ng ?????n trang ch??? !",
				showConfirmButton: false,
				timer: 1000,
			});
			console.log($rootScope.students);
			window.location.href = "#/";
			return;
		} else {
			Swal.fire({
				icon: "error",
				title: "????ng k?? th???t b???i",
			});
			return;
		}
	};

	$scope.doiMatKhau = function () {
		for (let i = 0; i < $rootScope.students.length; i++) {
			if (
				$rootScope.students[i].username == $rootScope.user &&
				$rootScope.students[i].password == $scope.doiMatKhau.password &&
				$scope.doiMatKhau.password2 == $scope.doiMatKhau.password3
			) {
				$rootScope.students[i].password = $scope.doiMatKhau.password2;
				Swal.fire({
					icon: "success",
					title: "?????i m???t kh???u th??nh c??ng !",
					text: "Chuy???n h?????ng ?????n trang ch??? !",
					showConfirmButton: false,
					timer: 1000,
				});
				console.log($rootScope.students);
				window.location.href = "#/";
			} else if (
				$rootScope.students[i].password != $scope.doiMatKhau.password
			) {
				Swal.fire({
					icon: "error",
					title: "M???t kh???u c?? kh??ng ????ng !",
				});
			} else if ($scope.doiMatKhau.password2 != $scope.doiMatKhau.password3) {
				Swal.fire({
					icon: "error",
					title: "M???t kh???u m???i kh??ng kh???p nhau !",
				});
			}
		}
	};

	$scope.capNhatThongTin = function () {
		for (let i = 0; i < $rootScope.students.length; i++) {
			if ($rootScope.students[i].username == $rootScope.user) {
				$rootScope.students[i].schoolfee =
					$scope.capNhatThongTinTaiKhoan.schoolfee;
				$rootScope.students[i].marks = $scope.capNhatThongTinTaiKhoan.marks;
				$rootScope.students[i].gender = $scope.capNhatThongTinTaiKhoan.gender;
				$rootScope.students[i].fullname =
					$scope.capNhatThongTinTaiKhoan.fullName;
				$rootScope.students[i].email = $scope.capNhatThongTinTaiKhoan.email;
				$rootScope.students[i].birthday =
					$scope.capNhatThongTinTaiKhoan.birthday;
				Swal.fire({
					icon: "success",
					title: "?????i th??ng tin th??nh c??ng !",
					text: "Chuy???n h?????ng ?????n trang ch??? !",
					showConfirmButton: false,
					timer: 1000,
				});
				console.log($rootScope.students);
				console.log($rootScope.students);
				return;
			} else {
				Swal.fire({
					icon: "error",
					title: "?????i th??ng tin th???t b???i !",
				});
				return;
			}
		}
	};
	$scope.dangXuatTaiKhoan = function () {
		$rootScope.user = null;
		Swal.fire({
			icon: "success",
			title: "????ng xu???t th??nh c??ng !",
			text: "Chuy???n h?????ng ?????n trang ch??? !",
			showConfirmButton: false,
			timer: 1000,
		});
		console.log($rootScope.students);
		window.location.href = "#/";
	};
}

function danhMucTaiKhoan($scope, $rootScope) {
	$scope.editTaiKhoan = function (index) {
		$scope.index = index;
		$scope.qlTaiKhoan = angular.copy($rootScope.students[index]);
	};

	$scope.addTaiKhoan = function () {
		$rootScope.students.push(angular.copy($scope.qlTaiKhoan));
		$scope.refeshTaiKhoan();
		console.log($rootScope.students);
		Swal.fire({
			icon: "success",
			title: "Th??m th??nh c??ng !",
			showConfirmButton: false,
			timer: 1000,
		});
	};
	$scope.updateTaiKhoan = function () {
		$rootScope.students[$scope.index] = $scope.qlTaiKhoan;
		console.log($rootScope.students);
		Swal.fire({
			icon: "success",
			title: "S???a th??nh c??ng !",
			showConfirmButton: false,
			timer: 1000,
		});
	};
	$scope.deleteTaiKhoan = function (index) {
		$rootScope.students.splice(index, 1);
		$scope.refeshTaiKhoan();
		console.log($rootScope.students);
		Swal.fire({
			icon: "success",
			title: "Xo?? th??nh c??ng !",
			showConfirmButton: false,
			timer: 1000,
		});
		window.location.href = "#/";
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
					// alert("????ng");
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
