package com.tito.repository;

import java.util.List;

import com.tito.db.DbConnection;
import com.tito.model.Sausage;

public class SausageRepositoryStub implements SausageRepository {

	private DbConnection dbConnection = null;

	public SausageRepositoryStub(DbConnection dbConnection) {
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
		// TODO Auto-generated method stub
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
