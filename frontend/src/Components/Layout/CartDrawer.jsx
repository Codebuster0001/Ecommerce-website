
import { IoMdClose } from "react-icons/io";

const CartDrawer = ({drawerOpen,toggleCartDrawer}) => {

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform transform ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      <button
        onClick={toggleCartDrawer}
        className="absolute top-4 h-6 w-6 right-4 text-2xl text-gray-800"
        aria-label="Close Cart"
      >
        <IoMdClose/>
      </button>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

        </div>
      </div>
   
  );
};

export default CartDrawer;
