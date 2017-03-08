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

	public Sausage findByUsername(String username) {
// TODO: Require authentication?
		return ((SausageRepository)this.repository).findByUsername(username);
	}

	public Sausage doLogin(Sausage sausage) {
		// Save off the incoming password
		String password = sausage.getPassword();
		sausage = this.findByUsername(sausage.getUsername());

		if (sausage != null) {

			Date now = new Date();
			sausage.setLastUpdatedAt(now);
			sausage.setLastUpdatedBy(sausage.getId());
			this.repository.update(sausage);

			// Now compare the incoming password to the hashed password in the database
			if (BCrypt.checkpw(password, sausage.getPassword())) {
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
