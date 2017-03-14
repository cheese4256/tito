package com.tito.repository;

import com.tito.model.Sausage;

public abstract class SausageRepository extends TitoRepositoryBase<Sausage> {
	public abstract Sausage findByUsername(String username);
}