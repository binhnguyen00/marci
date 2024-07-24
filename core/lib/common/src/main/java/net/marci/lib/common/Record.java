package net.marci.lib.common;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author Binh Nguye
 * @Email jackjack2000.kahp@gmail.com
 */
public class RecordMap extends LinkedHashMap<String, Object> {

  public RecordMap() {
    super();
  }

  public String getString(String key) {
    Object value = get(key);

    return "TODO";
  }

  private void checkIfKeyExists(String key) {
    if (!containsKey(key)) {

    }
  }
}