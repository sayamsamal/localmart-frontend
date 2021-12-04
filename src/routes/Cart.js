import { list } from "cart-localstorage";

export default function Cart() {
  return <div>{list()}</div>;
}
