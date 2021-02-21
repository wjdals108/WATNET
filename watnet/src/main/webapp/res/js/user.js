var joinBtnElem = document.querySelector('#joinBtn')
var idChkElem = document.querySelector('#idChk')
var nicknameChkElem = document.querySelector('#nicknameChk')
var loginBtnElem = document.querySelector('#login-btn')

//login.jsp --------------------- js
if(loginBtnElem) {
	var loginIdElem = document.querySelector('#loginId')
	var loginPwElem = document.querySelector('#loginPw')
	
	function login() {
		if(loginIdElem.value === '') {
			alert('아이디를 입력하세요')
			loginIdElem.focus()
			return
		} else if(loginPwElem.value === '') {
			alert('비밀번호를 입력하세요')
			loginPwElem.focus()
			return
		}
		
		var param = {
			userId: loginIdElem.value,
			userPw: loginPwElem.value,
		}

		fetch('/userAjax/login', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			if(myJson === 1) {
				location.href="/index"
				return
			} else if(myJson === 2) {
				alert('등록된 아이디가 없습니다.')
				loginIdElem.focus()
				return
			} else if(myJson === 3) {
				alert('비밀번호가 틀렸습니다.')
				loginPwElem.focus()
				return
			}
		})
		
	}
	
	loginBtnElem.addEventListener('click', login)
}



//join.jsp---------------js
if (joinBtnElem) {
	var userIdElem = document.querySelector('#id')
	var userPwElem = document.querySelector('#pw')
	var userPwChkElem = document.querySelector('#pwChk')
	var nicknameElem = document.querySelector('#nickname')
	var userEmailElem = document.querySelector('#email')
	var pNumElem = document.querySelector('#phoneNumber')
	var profileImgElem = document.querySelector('#profileImg')
	var recIdElem = document.querySelector('#recId')
	
	//아이디 중복확인
	function idChk() {
		if (userIdElem.value === '') {
			alert('아이디를 입력해 주세요')
			userIdElem.focus()
			return
		}
		
		fetch(`/userAjax/chkId?userId=${userIdElem.value}`)
		.then(function(res) {
			return res.json()
		})
		.then(function(myJson) {
			if(myJson === 1) {
				alert('중복된 아이디가 있습니다.')
				return
			} else {
				alert('아이디 사용이 가능합니다.')
			}
		})
	}
	idChkElem.addEventListener('click', idChk)


	//닉네임 중복확인
	function nicknameChk() {
		if(nicknameElem.value === '') {
			alert('닉네임을 입력해 주세요')
			nicknameElem.focus()
			return
		}
		
		fetch(`/userAjax/chkNickname?nickname=${nicknameElem.value}`)
		.then(function(res) {
			return res.json()
		})
		.then(function(myJson) {
			if(myJson === 1) {
				alert('중복된 닉네임이 있습니다.')
				return
			} else {
				alert('닉네임 사용이 가능합니다.')
			}
		})
	}
	nicknameChkElem.addEventListener('click', nicknameChk)


	//회원가입
	function join() {

		if (userIdElem.value === '') {
			alert('아이디를 입력해 주세요')
			userIdElem.focus()
			return
		} else if (userPwElem.value === '') {
			alert('비밀번호를 입력해 주세요')
			userPwElem.focus()
			return
		} else if (userPwElem.value !== userPwChkElem.value) {
			alert('비밀번호가 일치하지 않습니다.')
			userPwElem.focus()
			return
		} else if (nicknameElem.value === '') {
			alert('닉네임을 입력해 주세요')
			nmElem.focus()
			return
		} else if (userEmailElem.value === '') {
			alert('이메일을 입력해 주세요')
			userEmailElem.focus()
			return
		} else if (pNumElem.value === '') {
			alert('휴대폰 번호를 입력해 주세요')
			pNumElem.focus()
			return
		}
		
		var formData = new FormData()
		formData.append("profileImg", profileImgElem.files[0])

		var param = {
			userId: userIdElem.value,
			userPw: userPwElem.value,
			userMail: userEmailElem.value,
			nickname: nicknameElem.value,
			pNum: pNumElem.value,
			recId: recIdElem.value,
		}

		fetch('/userAjax', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function(res) {
			return res.json()
		})
			.then(function(myJson) {
				proc(myJson)
			})
	}

	function proc(myJson) {
		if (myJson.result === 0) {
			alert('회원가입에 실패하였습니다.')
			return
		}
		alert('회원가입에 성공하였습니다.')
		location.href = '/user/login'
	}

	joinBtnElem.addEventListener('click', join)
}
