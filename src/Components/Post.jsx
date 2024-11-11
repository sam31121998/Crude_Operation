import React, { useState } from "react";
import { getpost } from "../api/post_api";
import { useEffect } from "react";
import { deletepost } from "../api/post_api";
import Form from "./Form";

const Post = () => {
  const [data, setData] = useState([]);
  const [editData, seteditData] = useState({});

  //Data Get Method
  const getpostData = async () => {
    const res = await getpost();
    // console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getpostData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deletepost(id);
      // console.log(res);
      if (res.status === 200) {
        const updatedData = data.filter((curData) => {
          return curData.id !== id;
        });
        setData(updatedData);
      } else {
        console.log("the the id is not matched", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlepost = (elm) => seteditData(elm);

  return (
    <div>
      <section className="mid-part section-form">
        <Form
          data={data}
          setData={setData}
          editData={editData}
          seteditData={seteditData}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((elm) => {
            const { id, title, body } = elm;
            return (
              <li key={id}>
                <p>{title}</p>
                <p>{body}</p>
                <button onClick={() => handlepost(elm)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

export default Post;
