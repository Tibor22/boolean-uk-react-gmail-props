import { useState } from "react";

import initialEmails from "./data/emails";
import Emails from "./Emails";
import Header from "./Header";

import "./styles/app.css";

const getReadEmails = (emails) => emails.filter((email) => !email.read);

const getStarredEmails = (emails) => emails.filter((email) => email.starred);

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");
  const [search, setSearch] = useState("");
  const unreadEmails = emails.filter((email) => !email.read);
  const starredEmails = emails.filter((email) => email.starred);

  const result = (emails) =>
    emails.filter((email) => {
      if (email.title.includes(search)) return email;
    });

  const toggleStar = (targetEmail) => {
    const updatedEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      );
    setEmails(updatedEmails);
  };

  const toggleRead = (targetEmail) => {
    const updatedEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      );
    setEmails(updatedEmails);
  };

  const toggleOpen = (e, targetEmail) => {
    if (e.target.type === "checkbox") return;
    const updatedEmails = (emails) =>
      emails.map((email) => {
        if (e.target.innerText === "Back") return { ...email, open: false };
        else {
          return email.id === targetEmail.id ? { ...email, open: true } : email;
        }
      });
    setEmails(updatedEmails);
  };

  let filteredEmails = emails;

  if (hideRead) filteredEmails = getReadEmails(filteredEmails);

  if (currentTab === "starred")
    filteredEmails = getStarredEmails(filteredEmails);

  if (currentTab === "search") {
    filteredEmails = result(filteredEmails);
  }

  console.log(filteredEmails);
  return (
    <div className="app">
      <Header
        emails={emails}
        search={search}
        setSearch={setSearch}
        setCurrentTab={setCurrentTab}
      />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "inbox" ? "active" : ""}`}
            onClick={() => setCurrentTab("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <Emails
        filteredEmails={filteredEmails}
        toggleOpen={toggleOpen}
        toggleRead={toggleRead}
        toggleStar={toggleStar}
      />
    </div>
  );
}

export default App;
