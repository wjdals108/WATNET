package com.project.watnet.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.board.BoardMapper;
import com.project.watnet.model.PartyUserEntity;
import com.project.watnet.model.PostEntity;

@Service
public class PostService {
	@Autowired
	private PostMapper mapper;
	
	@Autowired
	private BoardMapper bMapper;
	
	public List<PostEntity> selPost(PartyUserEntity p) {
		PartyUserEntity vo = bMapper.selParty(p);
		if(vo==null) {
			return null;
		}
		PostEntity vo2 = new PostEntity();
		vo2.setBoardPk(vo.getBoardPk());
		
		return mapper.selPost(vo2);
	}
}
