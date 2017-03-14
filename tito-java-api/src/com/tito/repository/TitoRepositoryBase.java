package com.tito.repository;

import java.util.List;

import javax.persistence.EntityManager;

public abstract class TitoRepositoryBase<T> implements TitoRepository<T> {

	public abstract T create(T model);

	public abstract List<T> find();

	public abstract T findById(int id);

	public abstract T update(T model);

	public abstract void delete(T model);

	protected void handleException(EntityManager entityManager) {
		
	}
}