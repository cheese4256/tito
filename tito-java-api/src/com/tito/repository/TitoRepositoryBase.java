package com.tito.repository;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.validation.ConstraintViolation;

import com.tito.config.TitoApplication;

public abstract class TitoRepositoryBase<T> implements TitoRepository<T> {

	private EntityManagerFactory entityManagerFactory = null;

	public TitoRepositoryBase() {
		entityManagerFactory = TitoApplication.getEntityManagerFactory();
	}

	public abstract T create(T model);

	public abstract List<T> find();

	public abstract T findById(int id);

	public abstract T update(T model);

	public abstract void delete(T model);

	protected EntityManager getEntityManager() {
		return entityManagerFactory.createEntityManager();
	}

	protected void handleConstraintViolations(Set<ConstraintViolation<?>> violations, EntityManager entityManager) {
		for (ConstraintViolation<?> violation : violations) {
			System.out.println(violation.getRootBeanClass().getSimpleName() + "." + violation.getPropertyPath() + ": " + violation.getMessage());
		}
		entityManager.getTransaction().rollback();
	}

	protected void handleException(Exception e, EntityManager entityManager) {
		e.printStackTrace();
		entityManager.getTransaction().rollback();
	}
}