class App extends React.Component {
    constructor() {
      super();
      this.state = {
        searchText: '',
        users: [],
        notFound: ''
      };
    }
  
    onChangeHandle(event) {
      this.setState({searchText: event.target.value});
    }
  
    onSubmit(event) {
      event.preventDefault();
      const {searchText} = this.state;
      const url = `https://api.github.com/search/users?q=${searchText}`;
      fetch(url)
        .then(response => response.json())
        //.then(responseJson => this.setState({users: responseJson.items}))
        .then(responseJson => {
          if (responseJson.items.length > 0) {
            this.setState({users: responseJson.items, notFound: ''})
          } else {
            this.setState({users: [], notFound: "Not found! Enter a different name."})
          }
        });
    } 
  
    render() {
      return (
        <div className={'container'}>
          <h1>Github user search</h1>
          <form className={'form'} onSubmit={event => this.onSubmit(event)}>
            <label htmlFor="searchText">Search by user name</label>
            <input
              type="text"
              id="searchText"
              onChange={event => this.onChangeHandle(event)}
              value={this.state.searchText}/>
          </form>
          {
            this.state.notFound ? <p className={'notFound'}>{this.state.notFound}</p> : null
          }
          <UsersList users={this.state.users}/>
        </div> 
      ); 
    }
}

class UsersList extends React.Component {
    get users() {
      return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
  
    render() {
      return (
        <div className={'users'}>
          {this.users}
        </div>
      );
    }
}

class User extends React.Component {
    render() {
      return (
        <div className={'user'}>
          <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
          <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));