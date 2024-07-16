import React from "react";
import * as employee from "./employee"

export { employee }

let react = React as any;
if(!react['id']) {
  react['id'] = '@marci-ui/lib'
  console.log('Load React in module @datatp-ui/hr');
}