package com.tito.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.tito.config.TitoApplication;

public class MySqlConnection implements DbConnection {
	private String dbUrl = null;
	private String dbDriver = null;
	private String dbUsername = null;
	private String dbPassword = null;

	public MySqlConnection() {
		this.dbUrl = TitoApplication.properties.getProperty("db.url");
		this.dbDriver = TitoApplication.properties.getProperty("db.driver");
		this.dbUsername = TitoApplication.properties.getProperty("db.username");
		this.dbPassword = TitoApplication.properties.getProperty("db.password");
	}

	@Override
	public Connection getConnection() throws Exception {
		try {
			String connectionURL = this.dbUrl;
			Connection connection = null;
			Class.forName(this.dbDriver).newInstance();
			connection = DriverManager.getConnection(connectionURL, this.dbUsername, this.dbPassword);
			return connection;
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
