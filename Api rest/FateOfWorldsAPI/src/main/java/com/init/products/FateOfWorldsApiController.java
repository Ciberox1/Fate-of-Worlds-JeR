package com.init.products;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class FateOfWorldsApiController {
	private Map<String, Player> players = new ConcurrentHashMap<>();
	@CrossOrigin(origins = "*")
	@PostMapping("post")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Player> newPlayer(@RequestBody Player player,HttpServletRequest request,HttpServletResponse response) {
		if(players.size()<2) {
			if(!players.containsKey(player.getName())) {
				//String ip="";
				//if(request!=null)
					//ip=request.getHeader("X-FORWARDED-FOR");
					//if(ip==null || "".equals(ip))
						//ip = request.getRemoteAddr();
				//player.setIp(ip);
				player.setTime(System.nanoTime()/1000000000);
				players.put(player.getName(), player);
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
	public Collection<Player> PlayersList(HttpServletResponse response, @RequestParam String name) {
		Iterator<Player> playersCollectIterator=players.values().iterator();
		Player player;
		if(name!=null)
			players.get(name).setTime(0);
		while(playersCollectIterator.hasNext()) {
			player=playersCollectIterator.next();
			if(player.getTime()>=2) {
				players.remove(player.getName());
				System.out.println("El jugador ': " + name + "' se ha ido de la sesión");
				return players.values();
			}
			player.setTime(player.getTime()+1);
		}
			return players.values();
		
	}
	
	@DeleteMapping("delete")
	@CrossOrigin(origins = "*")
	public void deletePlayer(HttpServletRequest request,HttpServletResponse response) {
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