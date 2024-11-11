import React, { useEffect, useState } from "react";
import { datapost } from "../api/post_api";
import { updateData } from "../api/post_api";

//Data post Method

const Form = ({ data, setData, editData, seteditData }) => {
  const [postData, setpostData] = useState({
    title: "",
    body: "",
  });

  let emptyData = Object.keys(editData).length === 0;

  useEffect(() => {
    editData &&
      setpostData({
        title: editData.title || "",
        body: editData.body || "",
      });
  }, [editData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setpostData((prev) => {
      // console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addpostData = async () => {
    const res = await datapost(postData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setpostData({ title: "", body: "" });
    
    }
  };

  const updatepostData = async () => {
    const res = await updateData(editData.id, postData);
    try {
      console.log(res);
      setData((prev) => {
       return prev.map((elm)=>{
        return elm.id=== res.data.id ? res.data : elm;   
       })
      });

      setpostData({ title: "", body: "" });
      seteditData({});
    } catch (error) {
      console.log(error);
    }
  };

  //data submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Submit") {
      addpostData();
    } else if (action === "Edit") updatepostData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title"
            value={postData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="body"></label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Add Post"
            id="body"
            name="body"
            value={postData.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit" value={emptyData ? "Submit" : "Edit"}>
          {emptyData ? "Submit" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
