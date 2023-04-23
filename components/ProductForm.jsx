import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title,
  description,
  price,
  images: oldImages,
  category,
}) {
  const router = useRouter();
  const [productData, setProductData] = useState({
    _id: _id || null,
    title: title || "",
    description: description || "",
    price: price || "",
    images: oldImages || [],
    category: category || null,
  });

  const [categoriesList, setCategoriesList] = useState([]);
  const [images, setImages] = useState(productData.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'category' && value === '' ? null : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData._id) {
      await axios.put("/api/products", productData);
    } else {
      await axios.post("/api/products", productData);
    }
    router.push("/products");
  };

  async function uploadImages(e) {
    const files = e.target.files;
    const formData = new FormData();

    for (const file of files) {
      formData.append("images", file);
    }

    setIsUploading(true);
    const data = await axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImages([...images, response.data]);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => setIsUploading(false));
  }

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategoriesList(response.data);
    });
  }, []);

  useEffect(() => {
    setProductData((p) => ({
      ...p,
      images,
    }));
  }, [images]);

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>Product title</label>
      <input
        type="text"
        placeholder="name"
        name="title"
        required
        onChange={handleChange}
        value={productData.title}
      />

      <label>Category</label>
      {categoriesList.length ? (
        <select
          required
          onChange={handleChange}
          name="category"
          defaultValue={productData.category}
        >
          <option value="">Select Category</option>
          {categoriesList.map((item, i) => (
            <option key={i} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      ) : (
        <input value="Select category" readOnly />
      )}

      <label>Product description</label>
      <textarea
        placeholder="description"
        name="description"
        onChange={handleChange}
        value={productData.description}
      ></textarea>

      <label>Price (USD)</label>
      <input
        type="number"
        placeholder="price"
        name="price"
        required
        onChange={handleChange}
        value={productData.price}
      />

      <label>Photos</label>
      <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <div>Add image</div>
        <input type="file" onChange={uploadImages} className="hidden" />
      </label>

      {!images.length ? (
        <div className="my-2 text-sm">No photos are available</div>
      ) : (
        <div className="flex gap-3 my-2">
          <ReactSortable
            list={images}
            setList={setImages}
            className="flex gap-3"
          >
            {images.map((item, i) => (
              <div key={i} className="relative w-20 h-20">
                <Image
                  src={`/upload/products/${item}`}
                  alt="Product image"
                  fill
                  sizes="100vw"
                  className="w-full h-auto"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </ReactSortable>
          {isUploading && (
            <div className="relative w-20 h-20">
              <Image
                src={"/upload/spinner.gif"}
                alt="Uploading..."
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              ></Image>
            </div>
          )}
        </div>
      )}

      <button className="btn-primary">Save</button>
      <button onClick={() => router.back()} className="btn-default">Cancel</button>
    </form>
  );
}
