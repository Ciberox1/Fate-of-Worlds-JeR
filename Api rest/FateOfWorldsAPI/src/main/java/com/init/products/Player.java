package com.init.products;

import org.springframework.stereotype.Component;

@Component
public class Player {
	private String name="";
	private String password="";
	private long time;
	public Player() {
		
	}
	public void setName(String name) {
		this.name=name;
	}
	public String getName() {
		return this.name;
	}
	public void setPassword(String password) {
		this.password=password;
	}
	public String getPassword() {
		return this.password;
	}
	public void setTime(long time) {
		this.time=time;
	}
	public long getTime() {
		return this.time;
	}

}
