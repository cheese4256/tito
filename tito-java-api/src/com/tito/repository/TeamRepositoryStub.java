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

}
