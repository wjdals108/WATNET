package com.project.watnet;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

import com.project.watnet.model.UserEntity;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Component
public class SmsUtils {
	public void sendSms(UserEntity p, String temporaryPw) {
		String api_key = "NCS4MRDBKZVBRF3S"; //위에서 받은 api key를 추가
        String api_secret = "4PGIGHSGBZFKUYNQOAI3DLMHMRKYE5SF";  //위에서 받은 api secret를 추가
		
        String text = 
        		"인증번호 6자리는 " + temporaryPw + " 입니다.";
        
        Message coolsms = new Message(api_key, api_secret);
		
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", p.getpNum());
        params.put("from", "01036046380");
        params.put("type", "SMS");
        params.put("text", text);
        params.put("app_version", "test app 1.2");
        
        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            System.out.println(obj.toString());
          } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
          }
	}
	
}
