package com.tito.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.sun.istack.internal.NotNull;

@Entity
@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true)
public class Sausage {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@NotNull
	@Column(nullable = false)
	private int id;
	private String username;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	private String contestId;
	private String email;
	private String name;
	@OneToMany(cascade=CascadeType.ALL, mappedBy="sausage")
	private List<Team> teams;
	@Transient
	private String token;
	@Transient
	private Role[] roles;
	private String roleNames;

	public Sausage() {
	}

	public Sausage(String username) {
		this.username = username;
	}

	public Sausage(int id, String username) {
		this.id = id;
		this.username = username;
	}

	@JsonIgnore
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getContestId() {
		return contestId;
	}

	public void setContestId(String contestId) {
		this.contestId = contestId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public List<Team> getTeams() {
		return teams;
	}

	public void setTeams(List<Team> teams) {
		this.teams = teams;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String jwt) {
		this.token = jwt;
	}

	public Role[] getRoles() {
		return roles;
	}

	public void setRoles(Role[] roles) {
		this.roles = roles;
	}

	public String getRoleNames() {
		StringBuilder sb = new StringBuilder();
		if (this.roles != null && this.roles.length > 0) {
			sb.append(this.roles[0].getName());
			for (int i = 1; i < this.roles.length; i++) {
				sb.append(';');
				Role role = this.roles[i];
				sb.append(role.getName());
			}
		}
		return sb.toString();
	}
}
