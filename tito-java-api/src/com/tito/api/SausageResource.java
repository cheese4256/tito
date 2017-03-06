package com.tito.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.tito.model.Sausage;
import com.tito.service.JwtService;
import com.tito.service.SausageService;

@Path("sausages") // http://<server>:<port>/api/teams
public class SausageResource extends TitoResource<Sausage> {

	private JwtService jwtService;

	public SausageResource() {}

	public SausageResource(SausageService sausageService, JwtService jwtService) {
		super(sausageService);
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
		sausage = ((SausageService)service).doLogin(sausage);
// TODO: If the credentials are valid, create a JWT, update the DB (last accessed, whatever), set the token, *populate* and return the sausage
//       * So what goes on the JWT?
//         o sub
//         o exp?
//         o roles or something like that? (e.g., Admin)
//           - roles could/should come from the DB
// TODO: If the credentials are NOT valid, update the DB (last attempt maybe?), return a 401

		if (sausage != null) {
	
// TODO: Push the JWT stuff down into the services
			String token = jwtService.jwtSign(sausage);
	
			if (token != null) {
	
				sausage.setToken(token);
				return sausage;
	
			} else {
				return null;
			}
		}

		return null;
	}
}
