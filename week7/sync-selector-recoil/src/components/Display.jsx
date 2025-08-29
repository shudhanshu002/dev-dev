import { useRecoilValue } from "recoil";
import { doubleCountSelector } from "../store/selector";


export default function Display() {
     const doubleCount = useRecoilValue(doubleCountSelector);
  return <h2>Double Count: {doubleCount}</h2>;
}