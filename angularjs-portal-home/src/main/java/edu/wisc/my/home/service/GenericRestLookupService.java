package edu.wisc.my.home.service;

import java.util.Map;

public interface GenericRestLookupService {
  public Object getStuff(String key, Map<String, String> attributes);
}
