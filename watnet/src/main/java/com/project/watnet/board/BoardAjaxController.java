package com.project.watnet.board;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardDomain;
import com.project.watnet.model.BoardEntity;
import com.project.watnet.model.ContentsEntity;
import com.project.watnet.model.PartyUserEntity;
import com.project.watnet.model.UserDomain;

@RequestMapping("/boardAjax")
@RestController
public class BoardAjaxController {

	@Autowired
	private BoardService service;
	
	@PostMapping
	public int makeParty(@RequestBody BoardDomain p) {
		return service.insBoard(p);
	}
	
	@PostMapping("/joinParty")
	public int joinParty(@RequestBody PartyUserEntity p) {
		return service.joinParty(p);
	}
	
	@GetMapping
	public List<BoardEntity> selBoardList(BoardDTO p) {
		p.setRowCnt(20);
		return service.selBoardList(p);
	}
	
	@GetMapping("/selMyParty")
	public BoardDomain selMyParty(PartyUserEntity p) {
		return service.selMyParty(p);
	}
	
	@GetMapping("/selBoard")
	public BoardEntity selBoard(BoardEntity p) {
		return service.selBoard(p);
	}
	
	@GetMapping("/selUserProfile")
	public List<UserDomain> selUserProfile(PartyUserEntity p) {
		return service.selUserProfile(p);
	}
	
	@GetMapping("/contents")
	public List<ContentsEntity> concon(String category, String page) {
		String con = "nfx\",\"wac";
		if(category.equals("watcha")) {
			con = "wac";
		}else if(category.equals("netflix")) {
			con = "nfx";
		}
		List<ContentsEntity> list = new ArrayList<ContentsEntity>();
		// Jsoup를 이용해서 http://www.cgv.co.kr/movies/ 크롤링
		String url = "https://apis.justwatch.com/content/titles/ko_KR/popular?body=%7B%22fields%22:[%22cinema_release_date%22,%22full_path%22,%22full_paths%22,%22id%22,%22localized_release_date%22,%22object_type%22,%22poster%22,%22scoring%22,%22title%22,%22tmdb_popularity%22,%22backdrops%22,%22offers%22,%22original_release_year%22,%22backdrops%22],%22providers%22:[%22" + con +"%22],%22enable_provider_filter%22:false,%22monetization_types%22:[],%22page%22:" + page + ",%22page_size%22:30,%22matching_offers_only%22:true%7D&language=ko"; //크롤링할 url지정
		Document doc = null;        //Document에는 페이지의 전체 소스가 저장된다
		try {
			doc = Jsoup.connect(url).header("Origin", "https://www.justwatch.com").header("Referer", "https://www.justwatch.com/").ignoreContentType(true).get();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		String json = doc.select("body").text();
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = null;
		try {
			node = mapper.readTree(json);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<JsonNode> posterList = node.findValues("poster");
		List<JsonNode> urlList2 = node.findValues("standard_web");
		List<JsonNode> urlList = new ArrayList<JsonNode>();
		urlList.add(urlList2.get(0));
		for(int i = 1; i < urlList2.size(); i++) {
			if(!urlList2.get(i - 1).toString().equals(urlList2.get(i).toString())) {
				urlList.add(urlList2.get(i));
			}
		}
		for(int i = 0; i < posterList.size(); i++) {
			ContentsEntity temp = new ContentsEntity();
			String tempUrl = posterList.get(i).toString();
			tempUrl = tempUrl.replace("{profile}", "s166");
		    tempUrl = tempUrl.replace("\"", "");
		    tempUrl = "https://images.justwatch.com" + tempUrl;
			temp.setImgSrc(tempUrl);
			temp.setHrefSrc(urlList.get(i).toString());
			list.add(temp);
		}
		return list;
	}
	
	@DeleteMapping
	public int quitParty(PartyUserEntity p) {
		return service.quitParty(p);
	}
}
