import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function UpdateLog(props) {
  const [options, setOptions] = useState();
  var ChangedImage = []
  const id = props.id;
  console.log(id);

  useEffect(
    function () {
      async function getUpdateLog() {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/updatelog?id=${id}`
          );
          setOptions(response.data);
          
        } catch (error) {
          console.log("error", error);
        }
      }
      getUpdateLog();
    },
    [id]
  );
  let date = [];
  let time = [];

  if(options != null){
    for (let i = 0; i < options.length; i++) {
      ChangedImage.push(options[i].result.image);
    }
  }
  console.log(ChangedImage);

  if (options != null) {
    for (let i = 0; i < options.length; i++) {
      const dateObj = new Date(options[i].timestamp);
      date.push(
        dateObj.getDate().toString().padStart(2, "0") +
          "-" +
          (dateObj.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          dateObj.getFullYear().toString()
      );

      const timeObj = new Date(dateObj.getTime());
      time.push(
        timeObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }
  

  

  return (
    <div>
      {options &&
        options.map((option, index) => (
          <div>
            Date:{date[index]}
            <br />
            Time:{time[index]}
            {Object.keys(option.result.values.initialValues).map((key) => (
              <td key={key}>
                {ChangedImage[index] ? (
                  <>
                    
                    <p>Bill was changed</p>
                  </>
                ) : (
                  <p>Bill was not changed</p>
                )}
                {key}
                {option.result.values.initialValues[key]}
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
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
                {option.result.values.changedValues[key]}
              </td>
            ))}
          </div>
        ))}
    </div>
  );
}

export default UpdateLog;
