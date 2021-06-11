package com.init.products;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Stack;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

import javax.servlet.http.HttpServletRequest;

//import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.validation.MessageCodesResolver;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	int contador = 0;
		
	//Player Log
	private Map<String, Player> players = new ConcurrentHashMap<>();
	//private List<String> register = new ArrayList<>(); 
	
	//Message
	private Queue<Message> msg = new ConcurrentLinkedDeque<>();
	private Stack<Message> msg1 = new Stack<>();
	
	//DataBase stuff.
	private String bd_path = "src\\main\\resources\\data_base.txt";
	File bdFile = new File(bd_path);
	
	BufferedReader br;
	BufferedWriter bw;
	
	BufferedReader br1;
	
	DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	//End of database stuff.
	
	//DataBase msg.
	private String bdmsg_path = "src\\main\\resources\\data_base_msg.txt";
	File bdmsgFile = new File(bdmsg_path);
	
	BufferedReader brmsg;
	BufferedWriter bwmsg;
	
	//End of database msg.
	

	
	@CrossOrigin(origins = "*")	
	@PostMapping("postS")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Player> newPlayer(@RequestBody Player player,HttpServletRequest request) {
		
		if(players.size()<2) {
			if(!players.containsKey(player.getName())) {
				player.setTime(0);
				players.put(player.getName(), player);
				players.put(player.getPassword(), player);
				//Database stuff.
				try {
					bw = new BufferedWriter(new FileWriter(bdFile, true));
					bw.write( player.getName() + "  " + player.getPassword());
					bw.newLine();
					bw.close();
				}catch(IOException e) {
					System.out.println(e.toString());
				}
				
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
	
	@CrossOrigin(origins = "*")	
	@PostMapping("postL")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Player> playerLog(@RequestBody Player player,HttpServletRequest request) {
		if(players.size()<2) {
			//if(!players.containsKey(player.getName())) {
				boolean registered = false;
				String nameAux = player.getName();
				String passAux = player.getPassword();
				String logAux = nameAux + "  " + passAux;
				try {
					br1 = new BufferedReader(new FileReader(bdFile));
					String line;
					while((line = br1.readLine()) != null && registered == false) {
						if(logAux.equals(line)) {
							registered=true;
						}
					}
					br1.close();
				}catch(IOException e) {
					System.out.println(e.toString());
				}
				if(registered) {
					player.setTime(0);
					players.put(player.getName(), player);
				}
				return new ResponseEntity<>(player, HttpStatus.OK);
			//}
			/*else { 
				return new ResponseEntity<>(player,HttpStatus.CONFLICT);
			}*/
		}
		else {
			return new ResponseEntity<>(player,HttpStatus.INSUFFICIENT_STORAGE);
		}
	}
	
	@CrossOrigin(origins = "*")	
	@PostMapping("msgpost")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Message> newMessage(@RequestBody Message message,HttpServletRequest request) {
		
		//Database msg.
		try {
			Date today = Calendar.getInstance().getTime();
			String reportDate = df.format(today);
			String finalDate = reportDate;
			
			bw = new BufferedWriter(new FileWriter(bdmsgFile, true));
			bw.write( message.getUsername() + " -> " + message.getBody()+ " -> ");
			bw.write(finalDate);
			bw.newLine();
			bw.close();
			
			msg.add(message);
		}catch(IOException e) {
			System.out.println(e.toString());
		}
		
		return new ResponseEntity<>(message, HttpStatus.OK); 
		
	}
	
	@GetMapping("bd")
	public List<String> readBD() {
		
		List<String> playerss = new LinkedList<String>();
		
		try {
			br = new BufferedReader(new FileReader(bdFile));
			String line;
			while((line = br.readLine()) != null) {
				playerss.add(line);
			}
			br.close();
		}catch(Exception e) {
			System.out.println(e.toString());
		}
		
		return playerss;
	}
	
	@GetMapping("bdmsg")
	public List<String> readBDmsg() {
		
		List<String> msgs = new LinkedList<String>();
		
		try {
			br = new BufferedReader(new FileReader(bdmsgFile));
			String line;
			while((line = br.readLine()) != null) {
				msgs.add(line);
			}
			br.close();
		}catch(Exception e) {
			System.out.println(e.toString());
		}
		
		return msgs;
	}
	
	@GetMapping("get")
	@CrossOrigin(origins = "*")
	public Collection<Player> PlayersList(@RequestParam String name) {
		Iterator<Player> playersCollectIterator=players.values().iterator();
		Player player;
		if(name!=""){
			players.get(name).setTime(0);
		}	
		while(playersCollectIterator.hasNext()) {
			player=playersCollectIterator.next();
			if(player.getTime()>=3) {
				players.remove(player.getName());
				System.out.println("El jugador ': " + name + "' se ha ido de la sesión");
				return players.values();
			}
			player.setTime(player.getTime()+1);
		}
			return players.values();
		
	}
	
	@GetMapping("msgget")
	@CrossOrigin(origins = "*")
	public Collection<Message> messageList(@RequestParam String username, @RequestParam String body) {
		if(msg.size()>10) {
			msg.remove();
		}
		
		return msg;
	}
	
	@GetMapping("loadmsg")
	@CrossOrigin(origins = "*")
	public Collection<Message> oldMsg(){
		Stack<String> msgs10 = new Stack<>();
		try {
			br = new BufferedReader(new FileReader(bdmsgFile));
			String line;
			while((line = br.readLine()) != null) {
				msgs10.add(line);
			}
			br.close();
		}catch(Exception e) {
			System.out.println(e.toString());
		}
		for(int i = 0; i < 10; i++) {
			if(!msgs10.isEmpty()) {
				String aux = msgs10.pop();
				String [] aux2 = aux.split(" -> ");
				Message newMsg = new Message();
				newMsg.setUsername(aux2[0]);
				newMsg.setBody(aux2[1]);
				msg1.add(newMsg);
			}
		}
		for(int i = 0; i < 10; i++) {
			if(!msg1.isEmpty()) {
				msg.add(msg1.pop());
			}
		}
		return msg;
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
	
	@GetMapping("con")
	@CrossOrigin(origins = "*")
	public void serverConnection() {}
	
	@PostMapping("numP")
	@CrossOrigin(origins = "*")
	public void numP() {
		contador++;
	}
	
	@PostMapping("minusP")
	@CrossOrigin(origins = "*")
	public void minusP() {
		contador--;
	}
	
	@GetMapping("getP")
	@CrossOrigin(origins = "*")
	public int getP() {
		return contador;
	}
}
