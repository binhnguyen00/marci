package net.marci.module.http.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.utils.DataSerializer;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 * @Component is the name of the class
 * @Service is be one of the class's method
 */

@NoArgsConstructor
@Getter
@Setter
public class RPCRequest {
  private String version;
  private String component;
  private String service;
  private LinkedHashMap<String, JsonNode> parameters;

  @JsonIgnore
  public <T> T getParametersAs(String name, Class<T> type) {
    if (parameters == null) return null;
    JsonNode node = parameters.get(name);
    if (node == null) return null;
    T val = DataSerializer.JSON.treeToObject(node, type);
    return val;
  }

  @JsonIgnore
  public <T> List<T> getParametersAsList(String name, Class<T> type) {
    if (parameters == null) return null;
    JsonNode node = parameters.get(name);
    if (node == null) return null;
    return DataSerializer.JSON.treeToListObject(node, type);
  }
}