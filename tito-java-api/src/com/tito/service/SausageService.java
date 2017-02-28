package com.tito.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.mindrot.jbcrypt.BCrypt;

import com.tito.db.DbConnection;
import com.tito.model.Role;
import com.tito.model.Sausage;

public class SausageService {

	private DbConnection dbConnection = null;

	public SausageService(DbConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	public Sausage doLogin(Sausage sausage) {
		try {
			Connection connection = dbConnection.getConnection();
			if (connection != null) {

				String username = sausage.getUsername();
				String password = sausage.getPassword();

				Statement statement = connection.createStatement();
				String query = "select * from sausages where username = '" + username + "'";

				ResultSet resultSet = statement.executeQuery(query);

				if (resultSet.first()) {

					String dbPassword = resultSet.getString("password");

					if (BCrypt.checkpw(password, dbPassword)) {

						System.out.println("SUCCESSFUL LOGIN: " + username);
// TODO: Create sausage directly from DB object?
// TODO: Consider an ORM tool of some kind?
						sausage.setId(resultSet.getInt("id"));
						sausage.setUsername(resultSet.getString("username"));
						sausage.setPassword(dbPassword);
						sausage.setContestId(resultSet.getString("contestId"));
						sausage.setEmail(resultSet.getString("email"));
						sausage.setName(resultSet.getString("name"));
//						sausage.setRoles(resultSet.getString("roles"));
// TODO: For now, just a test role
						Role[] roles = {new Role("admin")};
						sausage.setRoles(roles);

						return sausage;

					} else {
						System.out.println("FAILED LOGIN: " + username);
						return null;
					}
				}

				resultSet.close();
				statement.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
