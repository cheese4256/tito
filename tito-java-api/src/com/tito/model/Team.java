package com.tito.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.internal.NotNull;

@Entity
@XmlRootElement
public class Team {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@NotNull
	@Column(name="id", nullable = false)
	private String id;
	@Column(name="name")
	private String name;
	@ManyToOne (cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name="sausageId", nullable=false)
	private Sausage sausage;
	@Column(name="homeruns")
	private int homeruns;

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

	public int getHomeruns() {
		return homeruns;
	}

	public void setHomeruns(int homeruns) {
		this.homeruns = homeruns;
	}
}
