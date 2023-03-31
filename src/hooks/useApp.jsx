import { useContext } from "react";
import AppContext from "../context/AppProvider";


function useApp() {
  return useContext(AppContext);
}

export default useApp