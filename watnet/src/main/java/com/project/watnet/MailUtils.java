package com.project.watnet;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.project.watnet.model.UserEntity;

@Component
public class MailUtils {
	
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendMail(UserEntity vo, String pw) {
		String setfrom = "WATNET";
		String tomail = vo.getUserMail();
		String title = "WATNET ID/PW 찾기";
		String content =
				"가입되어 있는 아이디 : " + vo.getUserId() + "\n"
				+ "임시로 부여된 8자리 비밀번호 : " + pw + "\n"
				+ "\n로그인 후 반드시 비밀번호를 변경해주세요."
				;
		
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message,
					true, "UTF-8");

			messageHelper.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
			messageHelper.setTo(tomail); // 받는사람 이메일
			messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
			messageHelper.setText(content); // 메일 내용

			mailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
