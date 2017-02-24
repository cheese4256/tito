package com.tito.repository;

import java.util.ArrayList;
import java.util.List;

import com.tito.model.Sausage;
import com.tito.model.Team;

public class TeamRepositoryStub implements TeamRepository {

	/* (non-Javadoc)
	 * @see com.tito.repository.TeamRepository#findAllTeams()
	 */
	@Override
	public List<Team> findAllTeams() {
	
// TODO: Database
		List<Team> teams = new ArrayList<Team>();

		for (int i = 0; i < 2; i++ ) {
			Team team = new Team();
			team.setName("TODO: Team Name: " + i);
			team.setSausage(new Sausage("TODO: Sausage Name: " + i));
			team.setTotalHomeruns(i * i);
			teams.add(team);
		}

		return teams;
	}

	public Team findTeamById(String teamId) {
// TODO: Database
		Team team = new Team();
		team.setId("123");
		team.setName("TODO: Team 123");
		team.setSausage(new Sausage("123", "TODO: Sausage 123"));
		team.setTotalHomeruns(123);
		return team;
	}

	@Override
	public void create(Team team) {
		// TODO: Insert into database
	}
}
