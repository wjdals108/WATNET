package com.project.watnet.model;

import org.springframework.web.multipart.MultipartFile;

public class UserDomain extends UserEntity{
	private String recId;
	private MultipartFile img;
	
	public MultipartFile getImg() {
		return img;
	}

	public void setImg(MultipartFile img) {
		this.img = img;
	}

	public String getRecId() {
		return recId;
	}

	public void setRecId(String recId) {
		this.recId = recId;
	}
}
