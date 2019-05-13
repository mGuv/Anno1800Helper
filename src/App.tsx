import React from 'react';
import Header from './Components/Header/Header';
import "./App.scss";
import Residents from './Components/Residents/Residents';
import DemandTab from './Components/DemandTab/DemanTab';

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
            this.state.selectedTab === 0 && <Residents/>
          }
          {
            this.state.selectedTab === 1 && <div> Industry </div>
          }
          {
            this.state.selectedTab === 2 && <DemandTab/>
          }
        </div>
      </div>
    );
  }
}

export default App;
