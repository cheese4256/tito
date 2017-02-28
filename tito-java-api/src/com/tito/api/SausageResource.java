package com.tito.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.tito.model.Role;
import com.tito.model.Sausage;
import com.tito.repository.SausageRepository;
import com.tito.service.JwtService;

@Path("sausages") // http://<server>:<port>/api/teams
public class SausageResource {

	@Context
	private SausageRepository sausageRepository;
	@Context
	private JwtService jwtService;

	public SausageResource() {}

	public SausageResource(SausageRepository sausageRepository, JwtService jwtService) {
		this.sausageRepository = sausageRepository;
		this.jwtService = jwtService;
	}

// TODO: Consider going asynchronous

	@POST
	// http://<server>:<port>/api/sausages/login
	@Path("login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage login(Sausage sausage) {

// TODO: Attempt to log the sausage in.
// TODO: If the credentials are valid, create a JWT, update the DB (last accessed, whatever), set the token, and return the sausage
//       * So what goes on the JWT?
//         o sub
//         o exp?
//         o roles or something like that? (e.g., Admin)
//           - roles could/should come from the DB
// TODO: If the credentials are NOT valid, update the DB (last attempt maybe?), return a 401

		// TODO: For now, just a test role
		Role[] roles = {new Role("admin")};
		sausage.setRoles(roles);

		String token = jwtService.jwtSign(sausage);

		if (token != null) {

			sausage.setToken(token);
// TODO: Create? This isn't registration, the sausage should already exist, right? 
//			sausageRepository.create(sausage);
			sausageRepository.update(sausage);

			return sausage;

		} else {
			return null;
		}
	}
}
