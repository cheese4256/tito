package com.tito.repository;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import com.tito.config.TitoApplication;
import com.tito.model.Sausage;

public class SausageRepositoryMySql implements SausageRepository {

	private EntityManagerFactory entityManagerFactory = null;

	public SausageRepositoryMySql() {
    	entityManagerFactory = Persistence.createEntityManagerFactory(TitoApplication.properties.getProperty("jpa.persistence.unit.name"));
	}

// TODO: Make TeamRepository either a base class, or the actual class (when JPA works), and move the EntityManager stuff in there
//	     Actually, if I can get the factory instantiated once, somewhere (TitoApplication?), then put it back there
	protected EntityManager getEntityManager() {
		return entityManagerFactory.createEntityManager();
	}

	@Override
	public Sausage create(Sausage sausage) {
		EntityManager entityManager = this.getEntityManager();
		try {

			entityManager.getTransaction().begin();
			entityManager.persist(sausage);
			entityManager.getTransaction().commit();

			return sausage;

		} catch (ConstraintViolationException e) {
// TODO: When the repository stuff gets abstracted properly, push the constraint violation handling into a base class
			Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
			for (ConstraintViolation<?> violation : violations) {
				System.out.println(violation.getRootBeanClass().getSimpleName() + "." + violation.getPropertyPath() + ": " + violation.getMessage());
			}
			entityManager.getTransaction().rollback();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
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

		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public void delete(Sausage model) {
		// TODO Auto-generated method stub
		
	}
}
