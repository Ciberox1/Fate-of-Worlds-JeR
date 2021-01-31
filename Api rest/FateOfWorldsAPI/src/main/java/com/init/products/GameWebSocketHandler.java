package com.init.products;


import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class GameWebSocketHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
protected void handleTextMessage(WebSocketSession session,TextMessage message) throws Exception {
	Iterator<WebSocketSession> sessionsCollectIterator=sessions.values().iterator();
	  if(!sessions.containsKey(session.getId()))
	  {
		  sessions.put(session.getId(), session);
	  }
		String msg = message.getPayload();	
		WebSocketSession ws;
		while(sessionsCollectIterator.hasNext()) {
			ws=sessionsCollectIterator.next();
			System.out.println("Session id: " + ws.getId());
			synchronized(ws) {
				ws.sendMessage(message);
			}
			
		}
		
	}

}