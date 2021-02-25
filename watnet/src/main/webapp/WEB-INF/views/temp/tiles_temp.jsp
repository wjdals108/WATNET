<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>WATNET</title>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/res/css/common.css">
<link rel="stylesheet" href="<tiles:getAsString name="categoryCss"/>">
<script defer src="<tiles:getAsString name="categoryJs"/>"></script>
<script defer src="/res/js/common.js"></script>

</head>
<body>
	<tiles:insertAttribute name="header" />
	<main>
		<tiles:insertAttribute name="content"/>
	</main>
</body>
</html>