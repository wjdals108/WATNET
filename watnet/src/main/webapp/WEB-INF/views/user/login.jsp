<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="login-container">
	<div class="login-form">
		<img id="login-watnet-logo" src="/res/img/logo.png" alt="watnet logo">
		<input id="loginId" type="text" placeholder="아이디를 입력하세요" required>
		<input id="loginPw" type="password" placeholder="패스워드를 입력하세요" required>
		<div class="login-anchor">
			<a href="/user/join">회원가입</a> <a onclick="window.open('/user/find/find', 'width=550, height=660')">아이디/비밀번호 찾기</a>
		</div>
		<button id="login-btn" type="button">로그인</button>
		<div class="login-span">
			WATNET 회원이 아니신가요?<br> 가입 즉시 <span class="text-red">사용 가능한
				1,000포인트</span> 받으세요~
		</div>
		<div class="sns-login-container">
			<div class="sns-login-img">
				<a href="###"> <img src="/res/img/naver-logo.png"
					alt="naver login">
				</a> <a href="###"> <img src="/res/img/kakao-logo.png"
					alt="kakao login">
				</a>
			</div>
		</div>
	</div>
</div>