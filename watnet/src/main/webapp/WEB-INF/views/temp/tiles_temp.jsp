<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
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