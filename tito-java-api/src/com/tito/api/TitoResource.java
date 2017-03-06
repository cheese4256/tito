package com.tito.api;

import com.tito.model.TitoModelBase;
import com.tito.service.TitoServiceBase;

public class TitoResource<T extends TitoModelBase> {

	protected TitoServiceBase<T> service = null;

	public TitoResource() {}

	public TitoResource(TitoServiceBase<T> service) {
		this.service = service;
	}
}