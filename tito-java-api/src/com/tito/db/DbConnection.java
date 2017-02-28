package com.tito.db;

import java.sql.Connection;

public interface DbConnection {
	Connection getConnection() throws Exception;
}
