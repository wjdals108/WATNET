package com.project.watnet.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.watnet.model.PointHistoryDomain;
import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;
import com.project.watnet.model.UtilsEntity;

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
		p.setUserCategory(1);
		MultipartFile profileImg = p.getImg();
		return service.insUser(p, profileImg);
	}
	
	@GetMapping("/chkUser")
	public int chkUser(UserDomain p) {
		return service.chkUser(p);
	}
	
	@PostMapping("/findUser")
	public int findUser(@RequestBody UserEntity p) {
		return service.findUser(p);
	}
	
	@GetMapping("/chkPNum")
	public int chkPNum(UserEntity p) {
		return service.chkPNum(p);
	}
	
	@PostMapping("/chkPw")
	public int chkPw(@RequestBody UserEntity p) {
		return service.chkPw(p);
	}
	
	@GetMapping("/chkTempPw")
	public int chkTempPw(UtilsEntity p) {
		return service.chkTempPw(p);
	}
	
	@GetMapping("/selUser")
	public UserEntity seluser(UserDomain p) {
		UserEntity vo = service.selUser(p);
		vo.setUserPw(null);
		return vo;
	}
	
	@GetMapping("/selPlusPointHistory")
	public List<PointHistoryDomain> selPlusPointHistory(PointHistoryDomain p) {
		return service.selPlusPointHistory(p);
	}
	
	@GetMapping("/selMinusPointHistory")
	public List<PointHistoryDomain> selMinusPointHistory(PointHistoryDomain p) {
		return service.selMinusPointHistory(p);
	}
	
	@PostMapping("/editProfile")
	public int editProfile(UserDomain p) {
		MultipartFile profileImg = p.getImg();
		return service.updProfile(p, profileImg);
	}
	
	@PutMapping
	public int plusPoint(@RequestBody UserDomain p) {
		return service.plusPoint(p);
	}
}
