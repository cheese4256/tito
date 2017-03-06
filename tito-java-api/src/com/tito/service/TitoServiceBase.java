package com.tito.service;

import java.util.List;

import com.tito.repository.TitoRepository;

public class TitoServiceBase<T> {

	protected TitoRepository<T> repository = null;

	public TitoServiceBase(TitoRepository<T> repository) {
		this.repository = repository;
	}

	public T create(T model) {
		return this.repository.create(model);
	}

	public List<T> find() {
		return this.repository.find();
	}

	public T findById(int id) {
		return this.repository.findById(id);
	}

	public T update(T model) {
		return this.repository.update(model);
	}

	public void delete(T model) {
		this.repository.delete(model);
	}
}
