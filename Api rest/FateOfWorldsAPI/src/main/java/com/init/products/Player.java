package com.init.products;

import org.springframework.stereotype.Component;

@Component
public class Player {
	private String name="";
	private long time;
	public Player() {
		
	}
	public void setName(String name) {
		this.name=name;
	}
	public String getName() {
		return this.name;
	}
	public void setTime(long time) {
		this.time=time;
	}
	public long getTime() {
		return this.time;
	}

}
