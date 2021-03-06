package com.project.watnet.user;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.project.watnet.model.UserDomain;
import com.project.watnet.sns.KakaoController;
import com.project.watnet.sns.NaverController;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private NaverController NaverController;
	
	@GetMapping("/login")
	public void login(HttpSession session, Model model) {
		String naverAuthUrl = NaverController.getAuthorizationUrl(session);
		String kakaoUrl = KakaoController.getAuthorizationUrl(session);
		model.addAttribute("kakao_url", kakaoUrl);
		model.addAttribute("naver_url", naverAuthUrl);
	}

	@GetMapping("/logout")
	public String logout(HttpSession session) {
		if(session.getAttribute("token") != null) {
			//노드에 로그아웃한 결과값음 담아줌 매개변수는 세션에 잇는 token을 가져와 문자열로 변환
			JsonNode node = KakaoController.Logout(session.getAttribute("token").toString());
			//결과 값 출력
			System.out.println("로그인 후 반환되는 아이디 : " + node.get("id"));
		} 
		session.invalidate();
		return "redirect:/user/login";
	}

	@GetMapping("/join")
	public void join() {}
	
	@GetMapping("/myParty")
	public void myParty() {}
	
	@GetMapping("/editProfile")
	public void editProfile() {}
	
	@GetMapping("/editProfileChkPw")
	public void editProfileChkPw() {}
	
	@GetMapping("/plusPoint")
	public void plusPoint() {}
	
	@GetMapping("/pointHistory")
	public void pointHistory() {}
	
	
	@RequestMapping(value = "/kakaologin", produces = "application/json", method = { RequestMethod.GET, RequestMethod.POST })
	public String kakaoLogin(@RequestParam("code") String code, HttpSession session) throws Exception {
		// 결과값을 node에 담아줌
		JsonNode node = KakaoController.getAccessToken(code);
		// accessToken에 사용자의 로그인한 모든 정보가 들어있음
		JsonNode accessToken = node.get("access_token");
		
		//노드 안에 있는 access_token값을 꺼내 문자열로 변환
        String token = node.get("access_token").toString();
        //세션에 담아준다.
        session.setAttribute("token", token);

		// 사용자의 정보
		JsonNode userInfo = KakaoController.getKakaoUserInfo(accessToken);
		String kid = null;
		String kemail = null;
		String kname = null;
		//String kgender = null;
		//String kbirthday = null;
		//String kage = null;
		//String kimage = null;
		// 유저정보 카카오에서 가져오기 Get properties
		JsonNode properties = userInfo.path("properties");
		JsonNode kakao_account = userInfo.path("kakao_account");
		kid = userInfo.path("id").asText();
		kemail = kakao_account.path("email").asText();
		kname = properties.path("nickname").asText();
		//kimage = properties.path("profile_image").asText();
		//kgender = kakao_account.path("gender").asText();
		//kbirthday = kakao_account.path("birthday").asText();
		//kage = kakao_account.path("age_range").asText();
		System.out.println("id : " + kid);
		System.out.println("email : " + kemail);
		System.out.println("nickname : " + kname);
		
		UserDomain vo = new UserDomain();
		vo.setUserId(kid);
		vo.setUserMail(kemail);
		vo.setNickname(kname);
		vo.setUserPw("kakao");
		vo.setUserCategory(3);
		
		if(service.chkUser(vo) == 0) {
			MultipartFile mf = null;
			service.insUser(vo, mf);
		}
		
		UserDomain vo2 = service.selUser(vo);
		session.setAttribute("loginUser", vo2);
		
		return "redirect:/index";
	}
	
	@RequestMapping(value = "/naverlogin", produces = "application/json;charset=utf-8", method = { RequestMethod.GET, RequestMethod.POST })
	public String naverLogin(@RequestParam String code, @RequestParam String state, HttpSession session) throws IOException {
		
		OAuth2AccessToken oauthToken;
		oauthToken = NaverController.getAccessToken(session, code, state);
		System.out.println(oauthToken);
		
		// 로그인한 사용자의 모든 정보가 JSON타입으로 저장되어 있음
		String apiResult = NaverController.getUserProfile(oauthToken);
		// 내가 원하는 정보 (이름)만 JSON타입에서 String타입으로 바꿔 가져오기 위한 작업
		JSONParser parser = new JSONParser();
		Object obj = null;
		try {
			obj = parser.parse(apiResult);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		JSONObject jsonobj = (JSONObject) obj;
		JSONObject response = (JSONObject) jsonobj.get("response");
		String nid = (String) response.get("id");
		String nnickname = (String) response.get("nickname");
		String nname = (String) response.get("name");
		String nemail = (String) response.get("email");
		String nmobile = (String) response.get("mobile");
		//String ngender = (String) response.get("gender");
		//String nbirthday = (String) response.get("birthday");
		//String nage = (String) response.get("age");
		//String nimage = (String) response.get("profile_image");
		
		System.out.println("id : " + nid);
		System.out.println("nickname : " + nnickname);
		System.out.println("name : " + nname);
		System.out.println("email : " + nemail);
		System.out.println("mobile : " + nmobile);
		
		UserDomain vo = new UserDomain();
		vo.setUserId(nid);
		vo.setNickname(nname);
		vo.setUserMail(nemail);
		vo.setpNum(nmobile);
		vo.setUserPw("naver");
		vo.setUserCategory(2);
		
		if(service.chkUser(vo) == 0) {
			MultipartFile mf = null;
			System.out.println(vo.getUserCategory());
			service.insUser(vo, mf);
		}

		UserDomain vo2 = service.selUser(vo);
		session.setAttribute("loginUser", vo2);
		
		return "redirect:/index";
	}
}
