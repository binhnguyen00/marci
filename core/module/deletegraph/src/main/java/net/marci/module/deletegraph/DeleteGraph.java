package net.marci.module.deletegraph;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DeleteGraph {

  Class<?> target() default Object.class;

  String table() default "";

  DeleteGraphJoinType joinType() default DeleteGraphJoinType.OneToOne;

  String joinField();
}