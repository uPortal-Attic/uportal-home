package edu.wisc.my.home.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.env.Environment;

public class KeyUtils {

  public static Map<String, String> getHeaders(Environment env, HttpServletRequest request, String key) {
    HashMap <String, String> map = new HashMap<String, String>();
    String attributes = env.getProperty(key + ".attributes");
    if(StringUtils.isNotBlank(attributes)) {
      for(String attribute : attributes.split(",")) {
        map.put(attribute, request.getHeader(attribute));
      }
    }
    return map;
  }

}
