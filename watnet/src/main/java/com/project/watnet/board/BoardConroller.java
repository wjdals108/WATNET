package com.project.watnet.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class BoardConroller {

	@GetMapping("/netflix")
	public void netflix() {}
	
	@GetMapping("/makeParty")
	public void makeParty() {}
}
