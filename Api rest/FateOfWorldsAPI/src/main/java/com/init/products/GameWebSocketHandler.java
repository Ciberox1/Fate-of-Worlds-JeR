package com.init.products;


import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@EnableWebSocket
@Component
public class GameWebSocketHandler extends TextWebSocketHandler {
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	protected void handleTextMessage(WebSocketSession session,TextMessage message) throws Exception {
	
		Iterator<WebSocketSession> sessionsCollectIterator=sessions.values().iterator();
	  
		if(!sessions.containsKey(session.getId()))
		{
			sessions.put(session.getId(), session);
		}
			Object[] sessionsArray = sessions.values().toArray();
			String msg = message.getPayload();	
			WebSocketSession ws;
			
			for(int i=0; i < sessionsArray.length; i++) {
				ws = (WebSocketSession)sessionsArray[i];
				System.out.println(sessionsArray.length);
				System.out.println("Session id: " + ws.getId());
				if(ws != session) {
					ws.sendMessage(message);
					System.out.println(message.getPayload());
				}
			}	
	}
	

	

}