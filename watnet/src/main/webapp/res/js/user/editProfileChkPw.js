var chkPwElem = document.querySelector('#editProfileChkPw-pw')
var chkPwSubBtn = document.querySelector('#editProfileChkPw-pwChkBtn')

var hiddenUserPkElem = document.querySelector('#hiddenUserPk')
var hiddenUserCategoryElem = document.querySelector('#hiddenUserCategory')

chkSnsLogin()

function chkSnsLogin() {
	if(hiddenUserCategoryElem.value != 1) {
		location.href = `/user/editProfile?userPk=${hiddenUserPkElem.value}`
	}
}

function chkPw() {
	var param = {
		userPk: hiddenUserPkElem.value,
		userPw: chkPwElem.value,
	}

	fetch(`/userAjax/chkPw`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(param)
	}).then(function(res) {
		return res.json()
	}).then(function(myJson) {
		if(myJson == 1) {
			location.href = `/user/editProfile?userPk=${hiddenUserPkElem.value}`
		} else {
			alert('비밀번호를 잘 못 입력하셨습니다.')
			return
		}
	})
}

chkPwSubBtn.addEventListener('click', chkPw)