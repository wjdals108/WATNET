var joinBtnElem = document.querySelector('#joinBtn')

if (joinBtnElem) {
	var userIdElem = document.querySelector('#id')
	var userPwElem = document.querySelector('#pw')
	var userPwChkElem = document.querySelector('#pwChk')
	var nicknameElem = document.querySelector('#nickname')
	var userEmailElem = document.querySelector('#email')
	var pNumElem = document.querySelector('#phoneNumber')
	var profileImgElem = document.querySelector('#profileImg')
	var recIdElem = document.querySelector('#recId')


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

		var param = {
			userId: userIdElem.value,
			userPw: userPwElem.value,
			userMail: userEmailElem.value,
			nickname: nicknameElem.value,
			pNum: pNumElem.value,
			profileImg: profileImgElem.value,
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
