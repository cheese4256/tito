package com.tito.model;

import javax.xml.bind.annotation.XmlRootElement;

import com.tito.model.Sausage;

@XmlRootElement
public class Team {
	private String name;
	private Sausage sausage;
	private int totalHomeruns;

	public Team() {
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
