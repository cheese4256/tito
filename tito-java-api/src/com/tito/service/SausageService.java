package com.tito.service;

import java.util.Date;

import org.mindrot.jbcrypt.BCrypt;

import com.tito.model.Sausage;
import com.tito.repository.SausageRepository;

public class SausageService extends TitoServiceBase<Sausage> {

	public SausageService(SausageRepository repository, JwtService jwtService) {
		super(repository, jwtService);
	}

	public Sausage create(Sausage sausage) {
// TODO: Require authentication? For now leave it open. How would I bootstrap the admin account? Does JPA help somehow?
		return super.create(sausage);
	}

	public Sausage update(Sausage sausage) {
// TODO: Require authentication? For now, yes.
		return super.update(sausage);
	}

	public Sausage updateOrCreate(Sausage sausage) {
// TODO: Require authentication? For now, yes for update, no for create.
		return super.updateOrCreate(sausage);
	}

	public Sausage findByUsername(String username) {
// TODO: Require authentication? For now, no.
		return ((SausageRepository)this.repository).findByUsername(username);
	}

	public Sausage doLogin(Sausage sausage) {
		// Save off the incoming password
		String password = sausage.getPassword();
		if (password == null) {
// TODO: Get messages from a properties file
			System.out.println("FAILED LOGIN: A password is required.");
			return null;
		}

		sausage = this.findByUsername(sausage.getUsername());

		if (sausage != null) {

			String hashedPassword = sausage.getPassword();

			Date now = new Date();
			sausage.setLastUpdatedAt(now);
			sausage.setLastUpdatedBy(sausage.getId());
			this.repository.update(sausage);

			// Now compare the incoming password to the hashed password in the database
			if (BCrypt.checkpw(password, hashedPassword)) {
				System.out.println("SUCCESSFUL LOGIN: " + sausage.getUsername());
				String token = jwtService.jwtSign(sausage);
				if (token != null) {
					sausage.setToken(token);
					return sausage;
				} else {
					return null;
				}
			} else {
				System.out.println("FAILED LOGIN: " + sausage.getUsername());
				return null;
			}
		}
		return null;
	}
}
