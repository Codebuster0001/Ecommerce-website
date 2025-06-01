import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full bg-white shadow-xl transform transition-transform duration-300 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      } lg:w-1/4 md:w-2/4 w-3/4 overflow-hidden`}
    >
      {/* Close Button */}
      <button
        onClick={toggleCartDrawer}
        className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        aria-label="Close Cart"
      >
        <IoMdClose />
      </button>

      {/* Cart Header */}
      <div className="p-6 pt-16">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-2">
          <CartContent />
        </div>

        {/* Checkout Footer */}
        <div className="pt-6 mt-6 border-t">
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </button>
          <p className="text-sm text-gray-500 text-center mt-2">
            Shipping & taxes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
