import React from "react";
import instructions from "./data";
const HowToUse = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-title text-center">
          <h4>ব্যবহারবীধি</h4>
        </div>
        <div className="card-body ">
          <ul className="text-">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction.content}</li>
            ))}
          </ul>
          <br />
          <div className="text-center">
            <h6 className="text-success">
              সামনে আরোও নতুন অপশন যুক্ত করে দেওয়া হবে
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
