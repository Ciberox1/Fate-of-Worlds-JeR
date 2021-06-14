package com.init.products;

import org.springframework.stereotype.Component;

@Component
public class Player {
	private String name="";
	private String password="";
	private boolean registered = false;
	private boolean inDB = false;
	private boolean inParty = false;
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
	public void setReg(boolean registered) {
		this.registered=registered;
	}
	public boolean getReg() {
		return this.registered;
	}
	public void setInDB(boolean inDB) {
		this.inDB=inDB;
	}
	public boolean getInDB() {
		return this.inDB;
	}
	public void setInParty(boolean inParty) {
		this.inParty=inParty;
	}
	public boolean getInParty() {
		return this.inParty;
	}
	public void setTime(long time) {
		this.time=time;
	}
	public long getTime() {
		return this.time;
	}

}
