package com.project.watnet.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.watnet.model.PartyUserEntity;
import com.project.watnet.model.PostDomain;
import com.project.watnet.model.PostEntity;

@RequestMapping("/postAjax")
@RestController
public class PostAjaxController {
	
	@Autowired PostService service;
	
	@GetMapping
	public List<PostDomain> selPost(PartyUserEntity p) {
		return service.selPost(p);
	}
	
	@PostMapping
	public int insPost(@RequestBody PostEntity p) {
		return service.insPost(p);
	}
}
