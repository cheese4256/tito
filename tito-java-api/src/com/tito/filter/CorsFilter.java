package com.tito.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletResponse;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CorsFilter implements Filter {

	@Override
    public void destroy() {
		// This method intentionally left blank.
	}

	@Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		this.doFilterInternal((HttpServletRequest)request, (HttpServletResponse)response,  filterChain);
	}

	@Override
    public void init(final FilterConfig filterConfig) throws ServletException {
		// This method intentionally left blank.
	}

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO: For now, allow everyone, but get this right
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
		response.addHeader("Access-Control-Allow-Methods", "GET");
		filterChain.doFilter(request, response);
	}
}
