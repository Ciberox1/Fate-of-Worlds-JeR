package com.init.products;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.validation.MessageCodesResolver;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@RestController
@RequestMapping("/")
public class FateOfWorldsApiController {
	private Map<String, Player> players = new ConcurrentHashMap<>();
	@CrossOrigin(origins = "*")
	@PostMapping("post")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Player> newPlayer(@RequestBody Player player,HttpServletRequest request) {
		if(players.size()<2) {
			if(!players.containsKey(player.getName())) {
				String ip="";
				if(request!=null)
					ip=request.getHeader("X-FORWARDED-FOR");
					if(ip==null || "".equals(ip))
						ip = request.getRemoteAddr();
				System.out.println(ip);
				player.setIp(ip);
				players.put(ip, player);
				return new ResponseEntity<>(player, HttpStatus.OK);
			}
			else { 
				return new ResponseEntity<>(player,HttpStatus.CONFLICT);
			}
		}
		else {
			return new ResponseEntity<>(player,HttpStatus.INSUFFICIENT_STORAGE);
		}
		
	}
	@GetMapping("get")
	@CrossOrigin(origins = "*")
	public Collection<Player> PlayersList() {
		return players.values();
	}
	
	@DeleteMapping("delete")
	@CrossOrigin(origins = "*")
	public void deletePlayer(HttpServletRequest request) {
		String ip=(String)request.getRemoteAddr();
		if(request!=null)
			ip=request.getHeader("X-FORWARDED-FOR");
			if(ip==null || "".equals(ip))
				ip = request.getRemoteAddr();
		if(players.containsKey(ip)) {
			System.out.println("Eliminando jugador con ip: "+ ip);
			players.remove(ip);
		}
		else {
			System.out.println("Ha fallado el servidor al borrar al jugador cuya ip es "+ ip);
		}
				
	}
	}