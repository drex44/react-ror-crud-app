class AllArticles extends React.Component {
  render() {
    var articles = this.props.articles.map(article => {
      return (
        <div key={article.id}>
          <Article
            article={article}
            handleDelete={this.props.handleDelete}
            handleUpdate={this.props.handleUpdate}
          />
        </div>
      );
    });

    return <div>{articles}</div>;
  }
}
