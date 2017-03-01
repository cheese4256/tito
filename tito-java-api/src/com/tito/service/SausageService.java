package com.tito.service;

import org.mindrot.jbcrypt.BCrypt;

import com.tito.model.Sausage;
import com.tito.repository.SausageRepository;
import com.tito.repository.TitoRepository;

public class SausageService extends TitoServiceBase {

	public SausageService(TitoRepository repository) {
		super(repository);
		this.repository = repository;
	}

	public Sausage doLogin(Sausage sausage) {
		// Save off the incoming password
		String password = sausage.getPassword();
		sausage = ((SausageRepository)this.repository).findByUsername(sausage.getUsername());
		if (sausage != null) {
			// Now compare the incoming password to the hashed password in the database
			if (BCrypt.checkpw(password, sausage.getPassword())) {
				System.out.println("SUCCESSFUL LOGIN: " + sausage.getUsername());
				return sausage;
			} else {
				System.out.println("FAILED LOGIN: " + sausage.getUsername());
				return null;
			}
		}
		return null;
	}
}
