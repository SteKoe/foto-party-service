"use client";

import React, { PropsWithChildren, useContext } from "react";
import mitt, { Emitter } from "mitt";

type Events = {
  "picture.uploaded": void;
};

const emitter = mitt<Events>();

export interface MittContextType {
  emitter: Emitter<Events>;
}

const MittContext = React.createContext<MittContextType>({ emitter });

export const MittProvider = ({ children }: PropsWithChildren) => {
  return (
    <MittContext.Provider value={{ emitter }}>{children}</MittContext.Provider>
  );
};

export const useMitt = () => useContext(MittContext);
