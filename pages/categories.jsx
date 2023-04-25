import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

export default function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryData, setCategoryData] = useState({
    _id: null,
    name: "",
    parent: "",
    properties: [],
  });
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  // const [properties, setProperties] = useState([]);

  const [properties, setProperties] = useState([
    { name: 'color', value: 'red,green,blue' },
    { name: 'size', value: 'L,M,S' },
  ]);

  const getCategories = () => {
    axios.get("/api/categories").then((response) => {
      setCategoriesList(response.data);
    });
  };

  const editCategory = (_id) => {
    axios
      .get("/api/categories", {
        params: { _id },
      })
      .then((response) => {
        setCategoryData(response.data);
      });
  };

  const deleteCategory = (_id) => {
    axios
      .delete("/api/categories", {
        params: { _id },
      })
      .then(() => {
        getCategories();
      })
      .finally(() => {
        setDeleteCategoryId(null);
      });
  };

  const addCategoryProperties = () => {
    setProperties((prev) => [...prev, { name: "", value: "" }]);
  };

  const handleChangeProperties = (e, index) => {
    const { name, value } = e.target;

    const newProperties = properties.map((property, i) => {
      if(i === index){
        return {...property, [name]: value};
      }
      return property;
    });

    setProperties(newProperties);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoryData({
      ...categoryData,
      [name]: name === "parent" && value === "" ? null : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setCategoryData({...categoryData, properties});

    if (categoryData._id) {
      await axios.put("/api/categories", categoryData);
    } else {
      await axios.post("/api/categories", categoryData);
    }

    setCategoryData({
      ...categoryData,
      _id: null,
      name: "",
      parent: "",
    });

    getCategories();
  };

  return (
    <Layout>
      {deleteCategoryId ? (
        <Modal
          nowOpen={true}
          title={"Delete Category"}
          onConfirm={() => deleteCategory(deleteCategoryId)}
          onDiscard={() => setDeleteCategoryId(null)}
          buttons={[
            {
              role: "discard",
              toClose: true,
              classes:
                "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
              label: "Cancel",
            },
            {
              role: "confirm",
              toClose: false,
              classes:
                "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200",
              label: "Confirm",
            },
          ]}
        >
          <div>You want to proceed?</div>
        </Modal>
      ) : null}

      <h1 className="my-2 mx-6">Add Category</h1>
      <form onSubmit={handleSubmit} className="ml-6 my-2 w-1/2">
        <div className="flex gap-1">
          <div className="w-2/3">
            <label>New Category name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              required
              onChange={handleChange}
              value={categoryData.name}
            />
          </div>
          <div className="w-1/3">
            <label>
              <br />
            </label>
            <select
              onChange={handleChange}
              name="parent"
              defaultValue={categoryData.parent}
            >
              <option value="">Parent category</option>
              {categoriesList.map(
                (item, i) =>
                  item._id !== categoryData._id && (
                    <option key={i} value={item._id}>
                      {item.name}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={addCategoryProperties}
          className="btn-primary !bg-blue-700 block !mt-4"
        >
          Add property
        </button>
        {properties &&
          properties.map((item, i) => (
            <div key={i} className="flex gap-4">
              <input
                className="w-1/3"
                type="text"
                name="name"
                onChange={(e) =>
                  handleChangeProperties(e, i, item.name, item.value)
                }
                defaultValue={item.name}
                placeholder="name"
              />
              <input
                className="w-2/3"
                type="text"
                name="value"
                onChange={(e) =>
                  handleChangeProperties(e, i, item.name, item.value)
                }
                defaultValue={item.value}
                placeholder="comma seprated values"
              />
            </div>
          ))}

        <button className="btn-primary">Save</button>
      </form>

      <div className="p-6 my-4">
        <h1>Categories</h1>
        <table className="basic">
          <thead>
            <tr>
              <td>Name</td>
              <td>Parent</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length ? (
              categoriesList.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(item._id)}
                      className="links"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteCategoryId(item._id);
                      }}
                      className="links"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="italic">
                  No Categories
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
