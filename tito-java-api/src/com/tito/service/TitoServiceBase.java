package com.tito.service;

import java.util.Date;
import java.util.List;

import com.tito.model.Sausage;
import com.tito.model.TitoModelBase;
import com.tito.repository.TitoRepository;

public class TitoServiceBase<T extends TitoModelBase> {

	protected TitoRepository<T> repository = null;
	protected JwtService jwtService = null;

	public TitoServiceBase(TitoRepository<T> repository, JwtService jwtService) {
		this.repository = repository;
		this.jwtService = jwtService;
	}

	public T create(T model) {
		this.updateCreateFields(model);
		return this.repository.create(model);
	}

	public List<T> find() {
		return this.repository.find();
	}

	public T findById(int id) {
		return this.repository.findById(id);
	}

	public T update(T model) {
		if (this.isAuthorizedForModel(model)) {
			this.updateLastUpdateFields(model);
			return this.repository.update(model);
		}
		return null;
	}

	public void delete(T model) {
		if (this.isAuthorizedForModel(model)) {
			this.repository.delete(model);
		}
	}

	protected void updateCreateFields(T model) {
		int id = jwtService.getCurrentSausage() != null
				 ? jwtService.getCurrentSausage().getId()
				 : -1;
// TODO: The id isn't cascading down into the sausage. Does @PrePersist help at all?
		if (id > -1) {
			model.setCreatedAt(new Date());
			model.setCreatedBy(id);
			this.updateLastUpdateFields(model);
		}
	}

	protected void updateLastUpdateFields(T model) {
		int id = jwtService.getCurrentSausage() != null
				 ? jwtService.getCurrentSausage().getId()
				 : -1;
// TODO: The id isn't cascading down into the sausage. Does @PrePersist help at all?
		if (id > -1) {
			model.setLastUpdatedAt(new Date());
			model.setLastUpdatedBy(id);
		}
	}

	private boolean isAuthorizedForModel(T model) {
		Sausage currentSausage = this.jwtService.getCurrentSausage();
		int currentSausageId = currentSausage != null ? currentSausage.getId() : null;
		if (model.getId() == currentSausageId) {
			return true;
		} else {
			return false;
		}
	}
}
