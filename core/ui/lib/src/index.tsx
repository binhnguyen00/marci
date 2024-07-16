import React from 'react';
import * as server from "./server";

export { React, server };

let react = React as any;
if (!react['id']) {
  react['id'] = '@marci-ui/lib'
  console.log("Load library @marci-ui/lib");
}