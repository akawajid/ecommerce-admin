import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewProduct(){

    const [productData, setProductData] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData({
            ...productData,
            [name]:value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post('/api/products', productData);
    }

    useEffect(() => {
    }, [productData]);

    return (
        <Layout>
            <div className="m-4">
            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>
                <label>Product title</label>
                <input type="text" placeholder="name" name="title" onChange={handleChange} />

                <label>Product description</label>
                <textarea placeholder="description" name="description" onChange={handleChange}></textarea>

                <label>Price (USD)</label>
                <input type="number" placeholder="price" name="price" onChange={handleChange} />

                <button className="btn-primary">Save</button>
            </form>

        </div>
        </Layout>
    );
}