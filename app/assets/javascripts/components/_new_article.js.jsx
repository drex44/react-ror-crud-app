const NewArticle = props => {
  let formFields = {};

  return (
    <form
      style={{
        margin: "1em",
        padding: "1em",
        border: "1px solid #ddd"
      }}
      onSubmit={e => {
        props.handleFormSubmit(formFields.title.value, formFields.text.value);
        e.target.reset();
        e.preventDefault();
      }}
    >
      <input
        ref={input => (formFields.title = input)}
        placeholder="Enter the title"
      />
      <input
        ref={input => (formFields.text = input)}
        placeholder="Enter the text"
      />
      <button>Submit</button>
    </form>
  );
};
