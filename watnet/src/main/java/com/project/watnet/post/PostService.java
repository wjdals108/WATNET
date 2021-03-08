package com.project.watnet.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.board.BoardMapper;
import com.project.watnet.model.PartyUserEntity;
import com.project.watnet.model.PostDomain;
import com.project.watnet.model.PostEntity;

@Service
public class PostService {
	@Autowired
	private PostMapper mapper;
	
	@Autowired
	private BoardMapper bMapper;
	
	public int getBoardPk(PartyUserEntity p) {
		PartyUserEntity vo = bMapper.selParty(p);
		if(vo==null) {
			return 0;
		}
		return vo.getBoardPk();
	}
	
	public int insPost(PostEntity p) {
		PartyUserEntity vo = new PartyUserEntity();
		vo.setUserPk(p.getSendUserPk());
		
		p.setBoardPk(getBoardPk(vo));
		
		System.out.println(p.getCtnt());
		
		return mapper.insPost(p);
	}
	
	public List<PostDomain> selPost(PartyUserEntity p) {
		PostEntity vo = new PostEntity();
		vo.setBoardPk(getBoardPk(p));
		
		return mapper.selPost(vo);
	}
}
