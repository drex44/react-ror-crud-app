class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewArticle = this.addNewArticle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  }

  handleFormSubmit(title, text) {
    let body = JSON.stringify({
      article: { title: title, text: text }
    });

    fetch("http://localhost:3000/api/v1/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(article => {
        this.addNewArticle(article);
      });
  }

  addNewArticle(article) {
    this.setState({
      articles: this.state.articles.concat(article)
    });
  }

  handleDelete(id) {
    fetch(`http://localhost:3000/api/v1/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log("Article was deleted!");
      this.deleteArticle(id);
    });
  }

  deleteArticle(id) {
    newArticles = this.state.articles.filter(article => article.id !== id);
    this.setState({
      articles: newArticles
    });
  }

  handleUpdate(article) {
    fetch(`http://localhost:3000/api/v1/articles/${article.id}`, {
      method: "PUT",
      body: JSON.stringify({ article: article }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.updateArticle(article);
    });
  }

  updateArticle(article) {
    let newArticles = this.state.articles.filter(f => f.id !== article.id);
    newArticles.push(article);
    this.setState({
      articles: newArticles
    });
  }

  componentDidMount() {
    fetch("/api/v1/articles.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ articles: data });
      });
  }
  render() {
    return (
      <div>
        <NewArticle handleFormSubmit={this.handleFormSubmit} />
        <AllArticles
          articles={this.state.articles}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
