package com.tito.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.tito.model.Sausage;
import com.tito.repository.SausageRepository;
import com.tito.service.JwtService;
import com.tito.service.SausageService;

@Path("sausages") // http://<server>:<port>/api/teams
public class SausageResource {

	@Context
	private SausageRepository sausageRepository;
	@Context
	private JwtService jwtService;
	@Context
	private SausageService sausageService;

	public SausageResource() {}

	public SausageResource(SausageRepository sausageRepository,
			JwtService jwtService,
			SausageService sausageService) {
		this.sausageRepository = sausageRepository;
		this.jwtService = jwtService;
		this.sausageService = sausageService;
	}

// TODO: Consider going asynchronous

	@POST
	// http://<server>:<port>/api/sausages/login
	@Path("login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage login(Sausage sausage) {

// TODO: Attempt to log the sausage in.
		sausage = sausageService.doLogin(sausage);
// TODO: If the credentials are valid, create a JWT, update the DB (last accessed, whatever), set the token, *populate* and return the sausage
//       * So what goes on the JWT?
//         o sub
//         o exp?
//         o roles or something like that? (e.g., Admin)
//           - roles could/should come from the DB
// TODO: If the credentials are NOT valid, update the DB (last attempt maybe?), return a 401

		if (sausage != null) {
	
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

		return null;
	}
}
