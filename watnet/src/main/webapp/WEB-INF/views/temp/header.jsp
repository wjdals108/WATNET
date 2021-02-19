<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<header>
	<nav id="watnet-nav">
		<div class="nav-container">
			<a href="/index"><img id="watnet-logo" src="/res/img/logo.png"
				alt="WATNET LOGO"></a>
			<ul>
				<li><a href="/index">HOME</a></li>
				<li>CONTENTS</li>
				<li>NETFLIX</li>
				<li>WATCHA</li>
				<li>MY파티</li>
			</ul>
			<a href="/user/login">
				<button id="index-login-btn" type="button">로그인</button>
			</a>
		</div>
	</nav>
</header>