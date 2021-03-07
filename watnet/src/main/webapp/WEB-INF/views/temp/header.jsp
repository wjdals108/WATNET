<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<tiles:importAttribute name="menuList"/>
<header>
	<nav id="watnet-nav">
		<div class="nav-container">
			<a href="/index"><img id="watnet-logo" src="/res/img/logo.png"
				alt="WATNET LOGO"></a>
			<ul id="nav-title-ul">
				<li id="nav-home-li"><a href="/index">HOME</a></li>
				<li><a href="/board/contents">CONTENTS</a></li>
				<c:forEach items="${menuList}" var="menu">
				<li><a href="/board/${fn:toLowerCase(menu.nm)}">${menu.nm}</a></li>
				</c:forEach>
				<li><a href="/user/myParty">MY파티</a></li>
			</ul>
			<div id="header-right-section">
			<c:choose>
				<c:when test="${sessionScope.loginUser != null}">
					<div id="dropUl-pContainer">
						<img id="header-myProfileImg" src="/res/img/user/${sessionScope.loginUser.userPk}/${sessionScope.loginUser.profileImg}" alt="my profile image" onerror="this.src='/res/img/profileImg.png'">
						<ul id="header-dropUl">
							<li class="dropUl-firstLi">
								<span id="header-nickname">${sessionScope.loginUser.nickname }</span>
								<a href="/user/myParty">
									<button id="goToMyPartyBtn" type="button">파티 관리</button>
								</a>
							</li>
							<li>
								<span>POINT :  <span class="redSpan"><fmt:formatNumber type="number" maxFractionDigits="3" value="${sessionScope.loginUser.userPoint}" /></span></span>
								<a href="/user/plusPoint?userPk=${sessionScope.loginUser.userPk}">
									<button id="chargePointBtn" type="button">충전</button>
								</a>
							</li>
							<li>
								<a href="/user/editProfileChkPw?userPk=${sessionScope.loginUser.userPk}">프로필 편집</a>
								<a href="/user/pointHistory">결제 내역 조회</a>
							</li>
							<li>
								<a href="/user/logout">로그아웃</a>							
							</li>
						</ul>
					</div>
					<a id="logout-anchor" href="/user/logout">
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
		</div>
	</nav>
</header>