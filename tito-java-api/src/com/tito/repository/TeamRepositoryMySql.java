package com.tito.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.tito.config.TitoApplication;
import com.tito.db.DbConnection;
import com.tito.model.Sausage;
import com.tito.model.Team;

public class TeamRepositoryMySql implements TeamRepository {

	private EntityManagerFactory entityManagerFactory = null;
	private DbConnection dbConnection = null;

	public TeamRepositoryMySql(DbConnection dbConnection) {

    	entityManagerFactory = Persistence.createEntityManagerFactory(TitoApplication.properties.getProperty("jpa.persistence.unit.name"));

		this.dbConnection = dbConnection;
	}

// TODO: Make TeamRepository either a base class, or the actual class (when JPA works), and move the EntityManager stuff in there
//       Actually, if I can get the factory instantiated once, somewhere (TitoApplication?), then put it back there
	protected EntityManager getEntityManager() {
		return entityManagerFactory.createEntityManager();
	}

	@Override
	public Team create(Team team) {
		// TODO: Insert into database
// TODO: If I get JPA working, get rid of the *MySql classes, and push all that out to the *Repository classes
		EntityManager entityManager = this.getEntityManager();
		try {

			entityManager.getTransaction().begin();
			entityManager.persist(team);
			entityManager.getTransaction().commit();

			return team;

		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		}
		return null;
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
		Sausage sausage = new Sausage(123, "TODO: Sausage 123");
		sausage.setContestId("scr");
		sausage.setEmail("sausage123@scr.org");
		sausage.setName("Sausage Name 123");
		team.setSausage(sausage);
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
