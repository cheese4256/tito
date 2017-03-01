package com.tito.repository;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

import com.tito.db.DbConnection;
import com.tito.model.Role;
import com.tito.model.Sausage;

public class SausageRepositoryMySql implements SausageRepository {

	private DbConnection dbConnection = null;

	public SausageRepositoryMySql(DbConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	@Override
	public void create(Sausage sausage) {
		// TODO: Insert into database
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
	public void update(Sausage sausage) {
		// TODO Auto-generated method stub
	}

	@Override
	public void delete(Sausage model) {
		// TODO Auto-generated method stub
		
	}
}
