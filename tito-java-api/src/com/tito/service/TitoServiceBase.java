package com.tito.service;

import com.tito.repository.TitoRepository;

public class TitoServiceBase {

	protected TitoRepository repository = null;

	public TitoServiceBase(TitoRepository repository) {
		this.repository = repository;
	}
}
