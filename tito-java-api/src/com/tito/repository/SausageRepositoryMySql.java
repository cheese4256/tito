package com.tito.repository;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.tito.config.TitoApplication;
import com.tito.db.DbConnection;
import com.tito.model.Role;
import com.tito.model.Sausage;

public class SausageRepositoryMySql implements SausageRepository {

	private EntityManagerFactory entityManagerFactory = null;
	private DbConnection dbConnection = null;

	public SausageRepositoryMySql(DbConnection dbConnection) {

    	entityManagerFactory = Persistence.createEntityManagerFactory(TitoApplication.properties.getProperty("jpa.persistence.unit.name"));

		this.dbConnection = dbConnection;
	}

// TODO: Make TeamRepository either a base class, or the actual class (when JPA works), and move the EntityManager stuff in there
//	     Actually, if I can get the factory instantiated once, somewhere (TitoApplication?), then put it back there
	protected EntityManager getEntityManager() {
		return entityManagerFactory.createEntityManager();
	}

	@Override
	public Sausage create(Sausage sausage) {
		EntityManager entityManager = this.getEntityManager();
		try {

			entityManager.getTransaction().begin();
			entityManager.persist(sausage);
			entityManager.getTransaction().commit();

			return sausage;

		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Sausage> find() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sausage findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sausage findByUsername(String username) {
		EntityManager entityManager = this.getEntityManager();
		@SuppressWarnings("rawtypes")
		List sausages = entityManager.createQuery("select s from Sausage s").getResultList();
		if (!sausages.isEmpty()) {
			Sausage sausage = (Sausage)sausages.get(0);
			return sausage;
		} else {
			return null;
		}
	}
	public Sausage findByUsername0(String username) {
		try {
			Connection connection = dbConnection.getConnection();
			if (connection != null) {

				Statement statement = connection.createStatement();
				String query = "select * from sausages where username = '" + username + "'";

				ResultSet resultSet = statement.executeQuery(query);

				if (resultSet.first()) {

// TODO: Create sausage directly from DB object?
// TODO: Consider an ORM tool of some kind?
					Sausage sausage = new Sausage();
					sausage.setId(resultSet.getInt("id"));
					sausage.setUsername(resultSet.getString("username"));
					sausage.setPassword(resultSet.getString("password"));
					sausage.setContestId(resultSet.getString("contestId"));
					sausage.setEmail(resultSet.getString("email"));
					sausage.setName(resultSet.getString("name"));
//					sausage.setRoles(resultSet.getString("roles"));
// TODO: For now, just a test role
					Role[] roles = {new Role("admin")};
					sausage.setRoles(roles);

					return sausage;
				}
	
				resultSet.close();
				statement.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Sausage update(Sausage sausage) {
		EntityManager entityManager = this.getEntityManager();
		try {

			entityManager.getTransaction().begin();
			entityManager.persist(sausage);
			entityManager.getTransaction().commit();

			return sausage;

		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public void delete(Sausage model) {
		// TODO Auto-generated method stub
		
	}
}
