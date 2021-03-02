<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<tiles:importAttribute name="menuList"/>
<header>
	<nav id="watnet-nav">
		<div class="nav-container">
			<a href="/index"><img id="watnet-logo" src="/res/img/logo.png"
				alt="WATNET LOGO"></a>
			<ul>
				<li><a href="/index">HOME</a></li>
				<li>CONTENTS</li>
				<c:forEach items="${menuList}" var="menu">
				<li><a href="/board/${fn:toLowerCase(menu.nm)}">${menu.nm}</a></li>
				</c:forEach>
				<li><a href="/user/myParty?userPk=${sessionScope.loginUser.userPk}">MY파티</a></li>
			</ul>
			<c:choose>
				<c:when test="${sessionScope.loginUser != null}">
					<a href="/user/logout">
						<button id="index-logout-btn" type="button">로그아웃</button>
					</a>
				</c:when>
				<c:otherwise>
					<a href="/user/login">
						<button id="index-login-btn" type="button">로그인</button>
					</a>
				</c:otherwise>
			</c:choose>
		</div>
	</nav>
</header>