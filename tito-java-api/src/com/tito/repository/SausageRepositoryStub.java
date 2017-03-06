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
	public Sausage create(Sausage sausage) {
		// TODO: Insert into database
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sausage update(Sausage sausage) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Sausage model) {
		// TODO Auto-generated method stub
		
	}
}
