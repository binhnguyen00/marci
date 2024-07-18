package net.marci.utils;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 */

public class DataSerializer {

  final static public Charset UTF8 = StandardCharsets.UTF_8;
  final static public DateFormat COMPACT_DATE_TIME = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss 'GMT'Z");
  final static public DataSerializer JSON = new DataSerializer(new MappingJsonFactory());

  private ObjectMapper mapper;
  private ObjectMapper compactMapper;

  public DataSerializer(JsonFactory factory) {
    this.mapper = new ObjectMapper(factory);
    configure(this.mapper);

    this.compactMapper = new ObjectMapper(factory);
    configure(this.compactMapper);
    this.compactMapper.disable(SerializationFeature.INDENT_OUTPUT);
  }

  static public void configure(ObjectMapper mapper) {
    mapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, false);
    mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    mapper.setDateFormat(COMPACT_DATE_TIME);
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    mapper.registerModule(new JavaTimeModule());
    mapper.enable(SerializationFeature.INDENT_OUTPUT);
  }

  public <T> String toString(T idoc) {
    if (idoc == null) return "";
    try {
      ObjectWriter owriter = mapper.writerWithDefaultPrettyPrinter();
      return owriter.writeValueAsString(idoc);
    } catch (IOException ex) {
      throw new RuntimeException(ex);
    }
  }

  public <T> T fromString(String data, Class<T> type) {
    try {
      StringReader reader = new StringReader(data);
      return mapper.readValue(reader, type);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public <T> T clone(T obj) {
    return clone((Class<T>) obj.getClass(), obj);
  }

  public <T> T clone(Class<T> type, T obj) {
    try {
      Writer writer = new StringWriter();
      ObjectWriter owriter = mapper.writerWithDefaultPrettyPrinter();
      owriter.writeValue(writer, obj);
      String json = writer.toString();
      return fromString(json, type);
    } catch (IOException ex) {
      throw new RuntimeException(ex);
    }
  }

  public <T> List<T> cloneList(List<T> list) {
    ArrayList<T> holder = new ArrayList<>();
    for (T sel : list) {
      holder.add(clone(sel));
    }
    return holder;
  }

  public <T> T treeToObject(JsonNode node, Class<T> type) {
    try {
      return mapper.treeToValue(node, type);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  public <T> List<T> treeToListObject(JsonNode node, Class<T> type) {
    try {
      ArrayNode arrayNode = (ArrayNode) node;
      List<T> list = new ArrayList<T>();
      for (JsonNode sel : arrayNode) {
        T object = mapper.treeToValue(sel, type);
        list.add(object);
      }
      return list;

    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}