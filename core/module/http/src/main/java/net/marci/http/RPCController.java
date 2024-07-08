package net.marci.http;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import net.marci.http.model.RPCRequest;
import net.marci.utils.DataSerializer;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.MethodDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

/**
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 * @RPC stands for Remote Procedure Call
 * @Usage Use for private api cases
 */
@Slf4j
@RestController
@RequestMapping("/rpc")
public class RPCController extends BaseController {

  @Autowired
  private ApplicationContext applicationContext;

  @PostMapping({"/call"})
  public @ResponseBody ResponseEntity<Object> call(@RequestBody RPCRequest request) {
    Callable<Object> executor = () -> {
      List<Object> argHolder = new ArrayList<>();
      return processRequest(request, argHolder);
    };
    final String component = request.getComponent();
    final String service = request.getService();
    return this.execute(component, service, executor);
  }

  private <T> ResponseEntity<Object> execute(String component, String service, Callable<T> executor) {
    try {
      T result = executor.call();
      return new ResponseEntity<>(result, HttpStatus.OK);
    } catch (Throwable cause) {
      log.error(cause.getMessage());
    }
    return null;
  }

  private Object processRequest(RPCRequest request, List<Object> argsHolder) throws IllegalAccessException, InvocationTargetException, IntrospectionException {
    Map<String, JsonNode> params = request.getParameters();
    Object component = applicationContext.getBean(request.getComponent());
    Assert.notNull(component, "Bean named: " + request.getService() + " is not found");

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