package com.project.watnet.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.watnet.model.UserDomain;

@RequestMapping("/userAjax")
@RestController
public class UserAjaxController {

	@Autowired
	private UserService service;
	
	@PostMapping
	public int insUser(@RequestBody UserDomain p) {
		return service.insUser(p);
	}
}
