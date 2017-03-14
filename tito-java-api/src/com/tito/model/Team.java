package com.tito.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Team extends TitoModelBase {
	@NotNull
	@Column(nullable=false)
	private String name;
	@NotNull
	@ManyToOne (cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name="SAUSAGEID", nullable=false)
	private Sausage sausage;
	private int homeruns;

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

	public int getHomeruns() {
		return homeruns;
	}

	public void setHomeruns(int homeruns) {
		this.homeruns = homeruns;
	}
}
