import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ""};
  }
  componentWillMount() {
    this.props.onLoad(
      "all",
      (page) => agent.Items.all(page, this.state.query),
      Promise.all([agent.Tags.getAll(), agent.Items.all(this.state.query)])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handleChange = e => {
    // console.log("form e.target.value.length:", e.target.value.length)
    if (e.target.value.length >= 3 || e.target.value.length === 0) this.setState({query: e.target.value})
  };

  render() {
    return (
      <div className="home-page">
        <Banner handleChange={this.handleChange}/>

        <div className="container page">
          <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
          <MainView query={this.state.query}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
