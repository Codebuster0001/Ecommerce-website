import React, { useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineTag,
  AiOutlineBgColors,
} from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, clearProduct } from "../../features/productsSlice";
import { addToCart } from "../../features/cartSlice";
import productsData from "../../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const localProduct = Array.isArray(productsData.products)
    ? productsData.products.find((p) => p._id?.toString() === id)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductById(id));
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
    setMainImage(null);
    return () => dispatch(clearProduct());
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images?.[0]) {
      setMainImage(product.images[0].url);
    } else if (localProduct?.images?.[0]) {
      setMainImage(localProduct.images[0].url);
    }
  }, [product, localProduct]);

  const currentProduct = product || localProduct;

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleQuantityChange = (action) => {
    setQuantity((prev) => {
      if (action === "increase") return prev + 1;
      if (action === "decrease") return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size.");
      return;
    }

    const cartItem = {
      productId: currentProduct.id || currentProduct._id,
      name: currentProduct.name,
      price: currentProduct.discountPrice || currentProduct.price,
      quantity,
      image: currentProduct.images[0]?.url,
      color: selectedColor,
      size: selectedSize,
      description: currentProduct.description,
    };

    setIsLoading(true);
    setTimeout(() => {
      dispatch(addToCart(cartItem));
      setIsLoading(false);
      toast.success(`${quantity} item(s) added to cart.`, { duration: 3000 });
    }, 100);
  };

  const handleImageSwitch = (url) => setMainImage(url);

  if (status === "loading")
    return <div className="p-10 text-center">Loading...</div>;
  if (status === "failed" && !localProduct)
    return <div className="p-10 text-red-500 text-center">Error: {error}</div>;
  if (!currentProduct)
    return <p className="text-center text-red-500">Error: Product not found</p>;

  const relatedProducts = Array.isArray(productsData.products)
    ? productsData.products.filter(
        (p) =>
          p.category === currentProduct.category &&
          (p._id || p.id) !== (currentProduct._id || currentProduct.id)
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Images */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:h-[500px]">
            {currentProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText || `Thumb ${index}`}
                onClick={() => handleImageSwitch(img.url)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-[400px] sm:h-[500px] object-cover rounded-lg shadow"
          />
        </div>

        {/* Right - Product Details */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{currentProduct.name}</h1>
          <p className="text-lg sm:text-xl text-slate-700 mb-4">
            ₹{currentProduct.discountPrice || currentProduct.price}
          </p>
          <p className="text-gray-600 mb-6">{currentProduct.description}</p>

          {/* Color Picker */}
          {currentProduct.colors && (
            <div className="mb-4">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <AiOutlineBgColors /> Color
              </h4>
              <div className="flex gap-3 flex-wrap">
                {currentProduct.colors.map((clr, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === clr ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: clr.toLowerCase() }}
                    onClick={() => handleColorSelect(clr)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Picker */}
          {currentProduct.sizes && (
            <div className="mb-4">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <AiOutlineTag /> Size
              </h4>
              <div className="flex gap-3 flex-wrap">
                {currentProduct.sizes.map((sz, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                      selectedSize === sz
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => handleSizeSelect(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                className="p-2"
                onClick={() => handleQuantityChange("decrease")}
              >
                <FiMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="p-2"
                onClick={() => handleQuantityChange("increase")}
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            disabled={isLoading}
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full sm:w-auto"
          >
            <AiOutlineShoppingCart className="inline-block mr-2" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>

          {/* Brand & Material */}
          <div className="mt-6 text-sm text-slate-500 space-y-1">
            <p>
              <strong>Brand:</strong> {currentProduct.brand}
            </p>
            <p>
              <strong>Material:</strong> {currentProduct.material}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relProd) => (
              <div
                key={relProd._id || relProd.id}
                className="border rounded-md p-4 cursor-pointer hover:shadow-md transition"
                onClick={() =>
                  navigate(`/products/${relProd._id || relProd.id}`)
                }
              >
                <img
                  src={relProd.images[0]?.url}
                  alt={relProd.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-medium text-base sm:text-lg">{relProd.name}</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  ₹{relProd.discountPrice || relProd.price}
                </p>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
