const form = document.getElementById("ask-form");
const field = document.getElementById("question");
const method = document.getElementById("method");
const result = document.getElementById("result");
const submit = document.getElementById("ask-button");
document.querySelectorAll(".example").forEach(button => button.addEventListener("click", () => {
  field.value = button.dataset.query;
  field.focus();
}));
function make(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value !== undefined) element.textContent = value;
  return element;
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  result.replaceChildren(make("p", "loading", "Retrieving authorized evidence…"));
  submit.disabled = true;
  try {
    const response = await fetch("/ask", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({question: field.value, method: method.value})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Request failed");
    const header = make("div", "result-head");
    header.append(make("strong", "", data.status === "evidence_found" ? "Evidence located" : "No sufficient evidence"));
    header.append(make("span", "badge", data.status.toUpperCase().replace("_", " ")));
    result.replaceChildren(header, make("p", "hint", data.answer));
    const list = make("div", "evidence");
    data.evidence.forEach((item, i) => {
      const card = make("article", "source");
      const top = make("div", "source-top");
      top.append(make("h3", "", String(i + 1).padStart(2, "0") + " / " + item.title));
      top.append(make("code", "", item.citation.document_id + "@" + item.citation.version
        + " [" + item.citation.start + ":" + item.citation.end + "]"));
      card.append(top, make("blockquote", "", item.citation.quote));
      list.append(card);
    });
    result.append(list, make("p", "hint", data.warning));
  } catch (error) {
    result.replaceChildren(make("p", "error", error.message));
  } finally {
    submit.disabled = false;
  }
});
