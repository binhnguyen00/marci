package net.marci.module.http;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import net.marci.module.http.dto.RPCRequest;
import net.marci.module.http.dto.ServerResponse;
import net.marci.module.http.dto.ServerResponse.Status;
import net.marci.utils.DataSerializer;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.MethodDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.text.MessageFormat;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

@Slf4j
@Service
public class RPCService {

  @Autowired
  private ApplicationContext applicationContext;

  public <T> ServerResponse execute(String component, String service, Callable<T> executor) {
    ServerResponse response = new ServerResponse(component, service);
    try {
      T result = executor.call();
      log.info("Execute {}:{} successfully", component, service);
      response.setStatus(Status.OK);
      response.setMessage(MessageFormat.format("Execute {0}:{1} successfully", component, service));
      response.setBody(result);
      return response;
    } catch (Exception ex) {
      log.error("Error executing {}:{}", component, service, ex);
      response.setStatus(Status.ERROR);
      response.setMessage(MessageFormat.format("Error executing {0}:{1}", component, service));
      response.setBody(ex.getCause());
      return response;
    }
  }

  public Object processRequest(RPCRequest request, List<Object> argsHolder) throws IllegalAccessException, InvocationTargetException, IntrospectionException {
    Object component = applicationContext.getBean(request.getComponent());
    Class<?> componentType = AopUtils.getTargetClass(component);
    BeanInfo beanInfo = Introspector.getBeanInfo(componentType);
    MethodDescriptor[] methods = beanInfo.getMethodDescriptors();
    MethodDescriptor mDescriptor = null;
    for (MethodDescriptor method : methods) {
      if (method.getMethod().getName().equals(request.getService())) {
        mDescriptor = method;
      }
    }

    Assert.notNull(mDescriptor, "No method " + request.getService() + " in class: " + request.getComponent());
    Parameter[] parameters = mDescriptor.getMethod().getParameters();

    final Map<String, JsonNode> params = request.getParameters();
    int argIdx = argsHolder.size();
    for (JsonNode jsonNode : params.values()) {
      Class<?> argType = parameters[argIdx].getType();
      if (List.class.isAssignableFrom(argType)) {
        ParameterizedType pType = (ParameterizedType) parameters[argIdx].getParameterizedType();
        Class<?> actualType = (Class<?>) pType.getActualTypeArguments()[0];
        List<?> values = DataSerializer.JSON.convertTreeToListObject(jsonNode, actualType);
        argsHolder.add(values);
      } else {
        Object value = DataSerializer.JSON.convertTreeToObject(jsonNode, argType);
        argsHolder.add(value);
      }

      argIdx++;
    }

    Object[] args = argsHolder.toArray();
    return mDescriptor.getMethod().invoke(component, args);
  }
}