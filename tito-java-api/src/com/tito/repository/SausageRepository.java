package com.tito.repository;

import com.tito.model.Sausage;

public interface SausageRepository extends TitoRepository<Sausage> {
	Sausage findByUsername(String username);
}