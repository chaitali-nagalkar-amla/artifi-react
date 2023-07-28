import { useEffect, useState } from "react";
import { ConstantsType, getConstants } from "./constantsManager";

export function useConstants(
  updatedConstants: ConstantsType | any = {}
): ConstantsType {
  const [constants, setConstants] = useState<ConstantsType>(getConstants());

  useEffect(() => {
    setConstants(getConstants()); // Update the state with the latest constants
  }, []);

  return constants;
}
