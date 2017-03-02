package com.tito.repository;

import java.util.ArrayList;
import java.util.List;

import com.tito.db.DbConnection;
import com.tito.model.Sausage;
import com.tito.model.Team;

public class TeamRepositoryMySql implements TeamRepository {

	private DbConnection dbConnection = null;

	public TeamRepositoryMySql(DbConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	@Override
	public void create(Team team) {
		// TODO: Insert into database
	}

	@Override
	public List<Team> find() {
	
// TODO: Database
		List<Team> teams = new ArrayList<Team>();

		for (int i = 0; i < 2; i++ ) {
			Team team = new Team();
			team.setName("TODO: Team Name: " + i);
			Sausage sausage = new Sausage("TODO: Sausage Name: " + i);
			sausage.setContestId("scr");
			sausage.setEmail("sausage" + i + "@scr.org");
			sausage.setName("Sausage Name " + i);
			team.setSausage(sausage);
			team.setTotalHomeruns(i * i);
			teams.add(team);
		}

		return teams;
	}

	public Team findById(int id) {
// TODO: Database
		Team team = new Team();
		team.setId("123");
		team.setName("TODO: Team 123");
		Sausage sausage = new Sausage(123, "TODO: Sausage 123");
		sausage.setContestId("scr");
		sausage.setEmail("sausage123@scr.org");
		sausage.setName("Sausage Name 123");
		team.setSausage(sausage);
		team.setTotalHomeruns(123);
		return team;
	}

	@Override
	public void update(Team model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Team model) {
		// TODO Auto-generated method stub
		
	}
}
