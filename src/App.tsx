import React from 'react';
import Header from './Components/Header';
import Demand from './Components/Demand/Demand';
import "./App.scss";
import Industry from './Components/Industry/Industry';

interface Props {

}

interface State {
  selectedTab: number
}

class App extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: 0
    }
  }

  private handleTabChange = (newTab: number) => {
    this.setState({
      selectedTab: newTab
    });
  };

  public render(): JSX.Element {
    return (
      <div className="annoHelper__main">
        <Header selectedTab={this.state.selectedTab} onTabSelected={this.handleTabChange} />
        <div className="annoHelper__contentContainer">
          {
            this.state.selectedTab === 0 && <Demand />
          }
          {
            this.state.selectedTab === 1 && <Industry />
          }
          
        </div>
      </div>
    );
  }
}

export default App;
