package com.project.watnet.model;

public class BoardDomain extends BoardEntity{
	private int userPk;
	private String nm;
	
	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public int getUserPk() {
		return userPk;
	}

	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
}
