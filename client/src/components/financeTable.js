import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const FinanceTable = (data) => {
  const deleteFunc = (entry) => {
    const config = {
      headers: {
        "auth-token": localStorage.usertoken,
      },
    };
    const _id = entry._id;
    axios
      .post(`/user/finance/remove`, { _id }, config)
      .then(() => {
        console.log("Success:");
        data.refresh();
      })
      .catch(() => {
        console.log("Smth went wrong");
      });
  };

  const renderFinanceEntries = () => {
    const finances = data.finances;
    return finances.map((obj) => (
      <tr key={obj._id}>
        <td>{obj.category}</td>
        <td>{obj.spent}$</td>
        <td>
          <Link to={{ pathname: "/user/budget", state: { obj: obj } }}>
            Edit link
          </Link>
        </td>
        <td>
          <input
            className="Button"
            type="button"
            value="Delete"
            onClick={() => {
              deleteFunc(obj);
            }}
          />
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <table style={{ width: 600, marginTop: 40 }}>
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th>Category</th>
            <th>Spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{data && renderFinanceEntries()}</tbody>
      </table>
    </div>
  );
};
export default FinanceTable;
