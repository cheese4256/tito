package com.tito.repository;

import java.util.List;

public interface TitoRepository<T> {

	void create(T model);

	List<T> find();

	T findById(int id);

	void update(T model);

	void delete(T model);
}