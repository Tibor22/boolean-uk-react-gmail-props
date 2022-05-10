import { useState } from "react";

import "./styles/Email.css";

export default function Email({ toggleOpen, toggleRead, toggleStar, email }) {
  return (
    <li
      onClick={(e) => toggleOpen(e, email)}
      className={`email ${email.read ? "read" : "unread"}`}
    >
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onChange={() => toggleRead(email)}
        />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onChange={() => toggleStar(email)}
        />
      </div>
      {!email.open && <div className="sender">{email.sender}</div>}
      {!email.open && <div className="title">{email.title}</div>}
      {email.open && (
        <div className="email-body">
          <p> A LOT OF INFORMATION from {email.sender}</p>

          <button className="btn-back">Back</button>
        </div>
      )}
    </li>
  );
}
