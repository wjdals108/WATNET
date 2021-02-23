package com.project.watnet.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;

@RequestMapping("/userAjax")
@RestController
public class UserAjaxController {

	@Autowired
	private UserService service;
	
	@PostMapping("/login")
	public int login(@RequestBody UserEntity p) {
		return service.login(p);
	}
	
	@PostMapping
	public int insUser(UserDomain p) {
		System.out.println(p.getImg());
		MultipartFile profileImg = p.getImg();
		return service.insUser(p, profileImg);
	}
	
	@GetMapping("/chkId")
	public int chkId(UserEntity p) {
		return service.chkId(p);
	}
	
	@GetMapping("/chkNickname")
	public int chkNickname(UserEntity p) {
		return service.chkNickname(p);
	}
}
