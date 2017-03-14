package com.tito.repository;

import java.util.ArrayList;
import java.util.List;

import com.tito.model.Sausage;
import com.tito.model.Team;

public class TeamRepositoryStub extends TeamRepository {

	public TeamRepositoryStub() {}

	@Override
	public Team create(Team team) {
		// TODO: Insert into database
		return null;
	}

	@Override
	public List<Team> find() {
	
// TODO: Database
		List<Team> teams = new ArrayList<Team>();

		for (int i = 0; i < 2; i++ ) {
			Team team = new Team();
			team.setName("TODO: Team Name: " + i);
			team.setSausage(new Sausage("TODO: Sausage Name: " + i));
			team.setHomeruns(i * i);
			teams.add(team);
		}

		return teams;
	}

	public Team findById(int id) {
// TODO: Database
		Team team = new Team();
		team.setId(123);
		team.setName("TODO: Team 123");
		team.setSausage(new Sausage(123, "TODO: Sausage 123"));
		team.setHomeruns(123);
		return team;
	}

	@Override
	public Team update(Team model) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Team model) {
		// TODO Auto-generated method stub
		
	}
}
