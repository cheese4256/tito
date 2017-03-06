package com.tito.repository;

import java.util.List;

public interface TitoRepository<T> {

	T create(T model);

	List<T> find();

	T findById(int id);

	T update(T model);

	void delete(T model);
}