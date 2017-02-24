package com.tito.model;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;

@XmlRootElement
public class Team {
	private String id;
	private String name;
	private Sausage sausage;
	private int totalHomeruns;

	public Team() {
	}

	@JsonIgnore
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String teamName) {
		this.name = teamName;
	}

	public Sausage getSausage() {
		return this.sausage;
	}

	public void setSausage(Sausage s) {
		this.sausage = s;
	}

	public int getTotalHomeruns() {
		return totalHomeruns;
	}

	public void setTotalHomeruns(int totalHomeruns) {
		this.totalHomeruns = totalHomeruns;
	}
}
