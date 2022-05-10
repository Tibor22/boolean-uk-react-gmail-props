import Email from "./Email";
import "./styles/Emails.css";

export default function Emails({
  filteredEmails,
  toggleRead,
  toggleStar,
  toggleOpen,
}) {
  const anyOpen = filteredEmails.some((email) => email.open);
  console.log(anyOpen);

  return (
    <main className="emails">
      <ul>
        {!anyOpen &&
          filteredEmails.map((email, index) => (
            <Email
              key={index}
              email={email}
              toggleOpen={toggleOpen}
              toggleStar={toggleStar}
              toggleRead={toggleRead}
            />
          ))}
      </ul>
      {anyOpen &&
        filteredEmails
          .filter((email) => email.open)
          .map((email, index) => (
            <Email
              key={index}
              email={email}
              toggleOpen={toggleOpen}
              toggleStar={toggleStar}
              toggleRead={toggleRead}
            />
          ))}
    </main>
  );
}
