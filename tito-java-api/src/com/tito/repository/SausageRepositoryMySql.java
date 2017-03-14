package com.tito.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.validation.ConstraintViolationException;

import com.tito.model.Sausage;

public class SausageRepositoryMySql extends SausageRepository {

// TODO: Actually, if I can get the factory instantiated once, somewhere (TitoApplication?), then put it back there

	@Override
	public Sausage create(Sausage sausage) {
		EntityManager entityManager = this.getEntityManager();
		try {

			entityManager.getTransaction().begin();
			entityManager.persist(sausage);
			entityManager.getTransaction().commit();

			return sausage;

		} catch (ConstraintViolationException e) {
			handleConstraintViolations(e.getConstraintViolations(), entityManager);
		} catch (Exception e) {
			handleException(e, entityManager);
		}
		return null;
	}

	@Override
	public List<Sausage> find() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sausage findById(int id) {
		EntityManager entityManager = this.getEntityManager();
		return entityManager.find(Sausage.class, id);
	}

	@Override
	public Sausage findByUsername(String username) {
		EntityManager entityManager = this.getEntityManager();
		List<Sausage> sausages = entityManager.createQuery("select s from Sausage s", Sausage.class).getResultList();
		if (!sausages.isEmpty()) {
			Sausage sausage = sausages.get(0);
			return sausage;
		} else {
			return null;
		}
	}

	@Override
	public Sausage update(Sausage sausage) {
		EntityManager entityManager = this.getEntityManager();
		try {

			entityManager.getTransaction().begin();
			entityManager.merge(sausage);
			entityManager.getTransaction().commit();

			return sausage;

		} catch (ConstraintViolationException e) {
			handleConstraintViolations(e.getConstraintViolations(), entityManager);
		} catch (Exception e) {
			handleException(e, entityManager);
		}
		return null;
	}

	@Override
	public void delete(Sausage model) {
		// TODO Auto-generated method stub
		
	}
}
