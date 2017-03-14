package com.tito.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.tito.model.Sausage;
import com.tito.service.SausageService;

@Path("sausages") // http://<server>:<port>/api/teams
public class SausageResource extends TitoResource<Sausage> {

	public SausageResource() {}

	public SausageResource(SausageService sausageService) {
		super(sausageService);
	}

// TODO: Consider going asynchronous

	@POST
	// http://<server>:<port>/api/sausages/sausage
	@Path("sausage")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage create(Sausage sausage) {
		return service.create(sausage);
	}

	@PUT
	// http://<server>:<port>/api/sausages/sausage
	@Path("sausage")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage update(Sausage sausage) {
		return service.update(sausage);
	}

	@POST
	// http://<server>:<port>/api/sausages/updateorcreate
	@Path("updateorcreate")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage updateOrCreate(Sausage sausage) {
		return service.updateOrCreate(sausage);
	}

	@POST
	// http://<server>:<port>/api/sausages/login
	@Path("login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage login(Sausage sausage) {
		sausage = ((SausageService)service).doLogin(sausage);
		if (sausage != null) {
			return sausage;
		} else {
			// Invalid credentials, so return a 401.
			throw new WebApplicationException(Response.Status.UNAUTHORIZED);
		}
	}
}
