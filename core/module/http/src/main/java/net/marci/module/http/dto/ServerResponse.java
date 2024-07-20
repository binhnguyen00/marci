package net.marci.module.http.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.utils.DataSerializer;

import java.util.Objects;

@NoArgsConstructor @Getter @Setter
public class ServerResponse {
  public enum Status { OK, ERROR, UNAUTHORIZED }

  private Status status;
  private String component;
  private String service;

  private String message;
  private JsonNode body;

  public ServerResponse(String component, String service) {
    this.component = component;
    this.service = service;
  }

  public ServerResponse(Status status, String message) {
    this.status = status;
    this.message = message;
  }

  @JsonIgnore
  public void setBody(Object value) {
    if (Objects.isNull(value)) {
      body = null;
    } else body = DataSerializer.JSON.convertObjectToTree(value);
  }

  @JsonIgnore
  public <T> T getBodyAs(Class<T> clazz) {
    if (Objects.isNull(body)) return null;
    return DataSerializer.JSON.convertTreeToObject(this.body, clazz);
  }
}