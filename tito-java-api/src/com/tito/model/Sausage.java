package com.tito.model;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true)
public class Sausage {
	private String id;
	private String username;
	private String token;

	public Sausage() {
	}

	public Sausage(String username) {
		this.username = username;
	}

	public Sausage(String id, String username) {
		this.id = id;
		this.username = username;
	}

	@JsonIgnore
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
