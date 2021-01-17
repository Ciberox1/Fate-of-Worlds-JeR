package com.init.products;

import org.springframework.stereotype.Component;

@Component
public class Player {
	private String ip="";
	private String name="";
	
	public Player() {
		
	}
	public void setName(String name) {
		this.name=name;
	}
	public String getName() {
		return this.name;
	}
	public void setIp(String ip) { 
		this.ip=ip;
	}
	public String getIp() {
		return this.ip;
	}

}
