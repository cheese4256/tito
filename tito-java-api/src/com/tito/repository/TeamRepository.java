package com.tito.repository;

import java.util.List;

import com.tito.model.Team;

public interface TeamRepository {

	List<Team> findAllTeams();

	Team findTeamById(String teamId);

	void create(Team team);

}