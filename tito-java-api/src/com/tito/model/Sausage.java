package com.tito.model;

import com.fasterxml.jackson.annotation.*;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Sausage {
	private String username;
	private String token;

	public Sausage() {
	}

	public Sausage(String name) {
		this.username = name;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String jwt) {
		this.token = jwt;
	}
}
