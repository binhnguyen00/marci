package net.marci.module.http;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import net.marci.module.http.dto.RPCRequest;
import net.marci.utils.DataSerializer;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.MethodDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

@Slf4j
@Service
public class RPCService {

  @Autowired
  private ApplicationContext applicationContext;

  public <T> ResponseEntity<Object> execute(String component, String service, Callable<T> executor) {
    try {
      T result = executor.call();
      return new ResponseEntity<>(result, HttpStatus.OK);
    } catch (Exception ex) {
      log.error("Error executing {}:{} - {}", component, service, Arrays.toString(ex.getStackTrace()));
      return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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
        List<?> values = DataSerializer.JSON.treeToListObject(jsonNode, actualType);
        argsHolder.add(values);
      } else {
        Object argVal = DataSerializer.JSON.treeToObject(jsonNode, argType);
        argsHolder.add(argVal);
      }

      argIdx++;
    }

    Object[] args = argsHolder.toArray();
    return mDescriptor.getMethod().invoke(component, args);
  }
}