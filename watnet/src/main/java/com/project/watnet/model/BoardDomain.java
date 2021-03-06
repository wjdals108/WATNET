package com.project.watnet.model;

public class BoardDomain extends BoardEntity{
	private int userPk;
	private String nm;
	private String nickname;
	private int modTempPoint;
	
	
	public int getModTempPoint() {
		return modTempPoint;
	}

	public void setModTempPoint(int modPoint) {
		this.modTempPoint = modPoint;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

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
