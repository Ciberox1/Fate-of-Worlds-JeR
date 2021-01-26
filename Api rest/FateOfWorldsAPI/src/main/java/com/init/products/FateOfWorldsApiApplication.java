package com.init.products;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
@SpringBootApplication
@EnableWebSocket

	public class FateOfWorldsApiApplication implements WebSocketConfigurer {
	@Override

		public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
			registry.addHandler(gameHandler(), "/game").setAllowedOrigins("*");
	}
	
	@Bean
		public GameWebSocketHandler gameHandler() {
			return new GameWebSocketHandler();
	}
	
		public static void main(String[] args) {
			SpringApplication.run(FateOfWorldsApiApplication.class, args);
		}
}