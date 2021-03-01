var joinBtnElem = document.querySelector('#joinBtn')
var idChkElem = document.querySelector('#idChk')
var nicknameChkElem = document.querySelector('#nicknameChk')

var pNumChkElem = document.querySelector('#phoneNumberChk')





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
	
	//join 인증버튼들 checkbox
	var idCheckboxElem = document.querySelector('#idChkCheckbox')
	var nicknameCheckboxElem = document.querySelector('#nicknameChkCheckbox')
	var pNumCheckboxElem = document.querySelector('#phoneNumberChkCheckbox')
	
	//join 휴대폰 인증 modal창
	var modalElem = document.querySelector('.modal')
	var mdCloseElem = modalElem.querySelector('#md_close')
	var mdCertificationElem = modalElem.querySelector('#certification')
	var mdSubmitBtnElem = modalElem.querySelector('#md_submit')
	
	function openModal(){
		modalElem.classList.remove('hidden')
	}
	
	function closeModal(){
		modalElem.classList.add('hidden')
	}
	
	function closeBtnModal() {
		if(confirm('아직 인증번호를 입력하시지 않으셨습니다. 정말 창을 닫으시겠습니까?')==true){
			closeModal()			
		} else {
			return
		}
	}
	
	mdCloseElem.addEventListener('click', closeBtnModal)
	
	// 이메일 체크 정규식
	function isEmail(asValue) {
		var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(asValue); // 형식에 맞는 경우 true 리턴	
	}

	// 핸드폰 번호 체크 정규식
	function isCelluar(asValue) {
		var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
		return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
	}
	
	//아이디 중복확인
	function idChk() {
		if (userIdElem.value === '') {
			alert('아이디를 입력해 주세요')
			userIdElem.focus()
			return
		}
		
		fetch(`/userAjax/chkUser?userId=${userIdElem.value}`)
		.then(function(res) {
			return res.json()
		})
		.then(function(myJson) {
			if(myJson === 1) {
				alert('중복된 아이디가 있습니다.')
				return
			} else {
				alert('아이디 사용이 가능합니다.')
				idCheckboxElem.checked = true
				return
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
		
		fetch(`/userAjax/chkUser?nickname=${nicknameElem.value}`)
		.then(function(res) {
			return res.json()
		})
		.then(function(myJson) {
			if(myJson === 1) {
				alert('중복된 닉네임이 있습니다.')
				return
			} else {
				alert('닉네임 사용이 가능합니다.')
				nicknameCheckboxElem.checked = true
				return
			}
		})
	}
	nicknameChkElem.addEventListener('click', nicknameChk)
	
	//휴대폰인증 버튼
	function pNumChk() {
		if (pNumElem.value === '') {
			alert('휴대폰 번호를 입력해 주세요')
			pNumElem.focus()
			return
		} else if(!isCelluar(pNumElem.value)) {
			alert('휴대폰 번호를 양식에 맞게 작성해주세요')
			pNumElem.focus()
			return
		}
		
		fetch(`/userAjax/chkPNum?pNum=${pNumElem.value}`)
		.then(function(res) {
			return res.json()
		})
		.then(function(myJson) {
			if(myJson === 1) {
				alert('sms전송완료')
				openModal()
				return
			} else {
				alert('실패')
			}
		})
	}
	//pNumChkElem.addEventListener('click', pNumChk)
	
	function chkTempPw() {
		if (mdCertificationElem.value === '') {
			alert('인증번호 6자리를 입력해 주세요')
			mdCertificationElem.focus()
			return
		}
		
		fetch(`/userAjax/chkTempPw?tempPw=${mdCertificationElem.value}`)
		.then(function(res) {
			return res.json()
		})
		.then(function(myJson) {
			if(myJson === 1) {
				alert('인증완료')
				closeModal()
				pNumCheckboxElem.checked = true
				return
			} else {
				alert('인증번호를 다시 확인해주세요')
				return
			}
		})
	}
	mdSubmitBtnElem.addEventListener('click', chkTempPw)
	
	
	

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
			nicknameElem.focus()
			return
		} else if (userEmailElem.value === '') {
			alert('이메일을 입력해 주세요')
			userEmailElem.focus()
			return
		} else if (pNumElem.value === '') {
			alert('휴대폰 번호를 입력해 주세요')
			pNumElem.focus()
			return
		} else if(!isEmail(userEmailElem.value)) {
			alert('이메일을 양식에 맞게 작성해주세요')
			userEmailElem.focus()
			return
		} else if(!isCelluar(pNumElem.value)) {
			alert('휴대폰 번호를 양식에 맞게 작성해주세요')
			pNumElem.focus()
			return
		} else if(!idCheckboxElem.checked) {
			alert('아이디 중복확인을 해주세요')
			userIdElem.focus()
			return
		} else if(!nicknameCheckboxElem.checked) {
			alert('닉네임 중복확인을 해주세요')
			nicknameElem.focus()
			return
		}
		/*
		 else if(!pNumCheckboxElem.checked) {
			alert('휴대폰 인증을 해주세요')
			pNumElem.focus()
			return
		}*/
		
		
		var formData = new FormData()
		formData.append("userId", userIdElem.value)
		formData.append("userPw", userPwElem.value)
		formData.append("userMail", userEmailElem.value)
		formData.append("nickname", nicknameElem.value)
		formData.append("pNum", pNumElem.value)
		formData.append("recId", recIdElem.value)
		if(profileImgElem.files.length !== 0){
			formData.append("img", profileImgElem.files[0])			
		}
		
		fetch('/userAjax', {
			method: 'post',
			body: formData
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