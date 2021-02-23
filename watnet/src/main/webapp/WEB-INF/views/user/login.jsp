<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="login-container">
	<div class="login-form">
		<img id="login-watnet-logo" src="/res/img/logo.png" alt="watnet logo">
		<input id="loginId" type="text" placeholder="아이디를 입력하세요" required>
		<input id="loginPw" type="password" placeholder="패스워드를 입력하세요" required>
		<div class="login-anchor">
			<a href="/user/join">회원가입</a> <a id="md_open">아이디/비밀번호 찾기</a>
		</div>

		<div class="modal hidden">
			<div class="md_overlay"></div>
			<div class="md_content">
				<h2>ID/PW 찾기</h2>
				<input type="text" class="md_input" id="md_email" placeholder="email을 입력하세요" required>
				<input type="text" class="md_input" id="md_pNum" placeholder="휴대폰 번호를 입력하세요" required>
				<button type="button" id="md_find">찾기</button>
				<button type="button" id="md_close">X</button>
			</div>
		</div>

		<button id="login-btn" type="button">로그인</button>
		<div class="login-span">
			WATNET 회원이 아니신가요?<br> 가입 즉시 <span class="text-red">사용 가능한
				1,000포인트</span> 받으세요~
		</div>
		<div class="sns-login-container">
			<div class="sns-login-img">
				<a href="${naver_url}"> <img src="/res/img/naver-logo.png"
					alt="naver login">
				</a> <a href="${kakao_url}"> <img src="/res/img/kakao-logo.png"
					alt="kakao login">
				</a>
			</div>
		</div>
	</div>
</div>